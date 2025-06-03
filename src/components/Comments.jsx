import PostComment from "./PostComment";
import { Trash } from "lucide-react";
import { deleteComment } from "../services/comment";

const Comments = ({ comments, setComments }) => {
    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
            setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }
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
                <PostComment comments={comments} setComments={setComments}/>
                {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-100 rounded-md p-5">
                        <div className="flex flex-col">
                            <div className="flex justify-between cursor-pointer">
                                <div className="text-lg font-bold">{comment.user.name} | {comment.createdAt}</div>
                                <Trash size={30} className="hover:bg-red-100 p-1 rounded" onClick={() => handleDelete(comment.id)}/>
                            </div>
                            <div>{comment.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;