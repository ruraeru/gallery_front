interface InfoProps {
    views: number;
    likes: number;
    comment: number;
}

export default function InfoBar(props: InfoProps) {
    return (
        <div>
            <p>댓글 : {props.comment}</p>
            <p>좋아요 : {props.likes}</p>
            <p>조회수 : {props.views}</p>
        </div>
    )
}