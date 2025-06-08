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
      formErrors: ["세션이 만료되었습니다."],
      fieldErrors: {},
    };
  }

  const avatarFile = formData.get("avatar");

  const result = await updateProfileFormSchema.safeParseAsync({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    avatar:
      avatarFile instanceof File && avatarFile.size > 0 ? avatarFile : null,
  });

  if (!result.success) {
    return result.error.flatten();
  }

  const currentUser = await db.user.findUnique({
    where: { id: session.id },
    select: { avatar: true },
  });
  let newAvatarDbPath = currentUser?.avatar || null;
  const validatedAvatarFile = result.data.avatar;

  if (validatedAvatarFile) {
    const userFolder = path.join(
      process.cwd(),
      "public",
      "images",
      "avatar",
      String(session.id)
    );
    if (currentUser?.avatar) {
      const oldAvatarFileName = path.basename(currentUser.avatar);
      const oldAvatarFsPath = path.join(userFolder, oldAvatarFileName);
      try {
        await fs.unlink(oldAvatarFsPath);
      } catch (err: any) {
        if (err.code !== "ENOENT") console.error("기존 아바타 삭제 실패:", err);
      }
    }

    try {
      await fs.mkdir(userFolder, { recursive: true });
      const fileExtension = path.extname(validatedAvatarFile.name);
      const fileName = `${session.id}_profile_${Date.now()}${fileExtension}`;
      const newAvatarFsPath = path.join(userFolder, fileName);
      const photoData = await validatedAvatarFile.arrayBuffer();
      await fs.writeFile(newAvatarFsPath, Buffer.from(photoData));
      newAvatarDbPath = `/images/avatar/${session.id}/${fileName}`;
    } catch (err: unknown) {
      return {
        formErrors: ["파일 저장 중 오류가 발생했습니다."],
        fieldErrors: {},
      };
    }
  }

  const updatePayload: {
    username: string;
    avatar: string | null;
    password?: string;
  } = {
    username: result.data.username,
    avatar: newAvatarDbPath,
  };

  if (result.data.password) {
    updatePayload.password = await bcrypt.hash(result.data.password, 12);
  }

  await db.user.update({
    where: { id: session.id },
    data: updatePayload,
  });

  await logOut();
}
