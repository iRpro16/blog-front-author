import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../services/comment";

const PostComment = ({ comments, setComments }) => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        content: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, 'content' : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = await postComment(id, formData);
        setFormData({ content: '' });
        setComments([ ...comments, newComment ]);
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-5 border-b-1 border-gray-200">
            <input 
                type="text"
                name="content"
                placeholder="Your thoughts..."
                value={formData.content}
                onChange={handleChange}
                className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            />
            <button className="bg-black p-1 text-white mb-5 rounded-md cursor-pointer">Respond</button>
        </form>
    )
}

export default PostComment;