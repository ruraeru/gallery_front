import ProfileForm from "@/components/users/profile-form";
import { getUser, isOwn } from "@/service/userService";
import { notFound } from "next/navigation";
import styles from '@/styles/ProfileEditForm.module.css';

export default async function ProfileEdit({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const isMyProfile = await isOwn(id);

    if (!isMyProfile) {
        notFound();
    }

    const userInfo = await getUser(id);
    if (!userInfo) {
        notFound();
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formContainer}>
                <ProfileForm user={userInfo} />
            </div>
        </div>
    );
};