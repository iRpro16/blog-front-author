import PostComment from "./PostComment";

const Comments = ({ comments }) => {
    return (
        <div className="comments flex flex-col w-full">
            <h1 className="text-xl">
                {comments.length !== 0 ? (
                    `Comments (${comments.length})`
                ) : (
                    "No comments yet"
                )}
            </h1>
            <div className="flex flex-col gap-5">
                <PostComment />
                {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-100 rounded-md p-5">
                        <div className="flex flex-col">
                            <div className="text-lg font-bold">{comment.user.name} | {comment.createdAt}</div>
                            <div>{comment.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;