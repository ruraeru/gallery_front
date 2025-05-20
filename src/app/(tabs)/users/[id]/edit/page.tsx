import ProfileForm from "@/components/users/profile-form";
import { getUser, isOwn } from "@/service/userService"
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProfileEdit({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isMyProfile = await isOwn(id);
    const userInfo = await getUser(id);
    if (!isMyProfile) return notFound();

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div style={{
                width: "1200px"
            }}>
                {userInfo && (
                    <ProfileForm user={userInfo} />
                )}
            </div>
        </div>
    )
};
