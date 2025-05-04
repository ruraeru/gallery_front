import axios from "axios";
import { unstable_cache as nextCache } from "next/cache";
interface ImageType {
  id: string;
  slug: string;
  alternative_slugs: object;
  created_at: string;
  updated_at: string;
  promoted_at: object;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: object;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  links: {
    download: string;
    download_location: string;
  };
  //   sponsorship: object;
  topic_submissions: object;
  asset_type: string;
  user: object; //user 정보
}

export const getImages = async (): Promise<ImageType[]> => {
  const res = await axios.get(
    "https://api.unsplash.com/photos/?client_id=j89NZZaPslK4CXgXww8ZfXjL8Gnc-hXaVd0O1Z6oU20"
  );

  return res.data;
};

export const getCahcedImages = nextCache(getImages, ["images"]);

export const getImageByID = async (id: string): Promise<ImageType> => {
  const res = await axios.get(
    `https://api.unsplash.com/photos/${id}?client_id=j89NZZaPslK4CXgXww8ZfXjL8Gnc-hXaVd0O1Z6oU20`
  );

  return res.data;
};

export const getCahcedImageByID = async (id: string) => {
  const cachedImage = nextCache(getImageByID, ["image"], {
    tags: [`image-${id}`],
  });
  return cachedImage(id);
};
