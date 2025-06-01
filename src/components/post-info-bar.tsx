import { HeartIcon } from "@heroicons/react/24/solid";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/PostInfoBar.module.css";

interface InfoProps {
    views: number;
    likes: number;
}

export default function InfoBar(props: InfoProps) {
    return (
        <div className={styles.infoBar}>
            <div className={styles.infoItem}>
                <HeartIcon width={16} />
                <span>{props.likes}</span>
            </div>
            <div className={styles.infoItem}>
                <ChartBarIcon width={16} />
                <span>{props.views}</span>
            </div>
        </div>
    );
}