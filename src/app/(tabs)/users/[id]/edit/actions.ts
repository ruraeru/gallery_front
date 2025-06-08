"use server";
import fs from "fs/promises";
import bcrypt from "bcrypt";
import { updateProfileFormSchema } from "@/lib/schema";
import getSession from "@/lib/session";
import path from "path";
import db from "@/lib/db";
import { logOut } from "@/app/(tabs)/(main)/actions";

export default async function updateProfile(_: unknown, formData: FormData) {
  const session = await getSession();
  if (!session.id) {
    return {
      formErrors: ["세션이 유효하지 않습니다. 다시 로그인해주세요."],
      fieldErrors: {},
    };
  }

  //유저 정보 조회
  const currentUser = await db.user.findUnique({
    where: { id: session.id },
    select: { avatar: true },
  });

  const avatarFile = formData.get("avatar");
  //데이터베이스에 저장될 최종 아바타 URL을 관리 변수
  let avatarDbPath = currentUser?.avatar || null;

  //새 파일이 업로드되었는지 확인
  if (avatarFile instanceof File && avatarFile.size > 0) {
    const userFolder = path.join(
      process.cwd(),
      "public",
      "images",
      "avatar",
      String(session.id)
    );

    //이전 프로필 파일 삭제 로직
    if (currentUser?.avatar) {
      const oldAvatarFileName = path.basename(currentUser.avatar);
      const oldAvatarFsPath = path.join(userFolder, oldAvatarFileName);
      try {
        await fs.unlink(oldAvatarFsPath);
        console.log(`기존 아바타 파일 삭제 완료: ${oldAvatarFsPath}`);
      } catch (err: any) {
        if (err.code !== "ENOENT") {
          console.error(
            `기존 아바타 파일 삭제 중 에러: ${oldAvatarFsPath}`,
            err
          );
        }
      }
    }

    //새 파일 저장 로직
    try {
      await fs.mkdir(userFolder, { recursive: true });

      const fileExtension = path.extname(avatarFile.name);
      const fileName = `${session.id}_profile_${Date.now()}${fileExtension}`;
      const newAvatarFsPath = path.join(userFolder, fileName);

      const photoData = await avatarFile.arrayBuffer();
      await fs.writeFile(newAvatarFsPath, Buffer.from(photoData));

      // 데이터베이스에 저장할 URL 업데이트
      avatarDbPath = `/images/avatar/${session.id}/${fileName}`;
    } catch (err) {
      console.error("아바타 업로드 중 에러: ", err);
      return { formErrors: ["파일 저장에 실패했습니다."] };
    }
  }

  // 폼 데이터 유효성 검사
  const result = updateProfileFormSchema.safeParse({
    avatar: avatarDbPath,
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return result.error.flatten();
  }

  // 데이터베이스 업데이트
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      username: result.data.username,
      password: await bcrypt.hash(result.data.password, 12),
      avatar: avatarDbPath, // 최종 아바타 URL로 업데이트
    },
  });

  // 프로필 수정 성공 시 로그아웃 후 메인으로 리디렉션
  await logOut();
}
