import { useState } from "react";

const PostComment = () => {
    const [formData, setFormData] = useState({
        comment: '',
    });
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, ['comment']: e.target.value });
    }
    return (
        <form className="flex gap-5 border-b-1 border-gray-200">
            <input 
                type="text"
                name="comment"
                placeholder="Your thoughts"
                value={formData.comment}
                onChange={handleChange}
                className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            />
            <button className="bg-black p-1 text-white mb-5 rounded-md">Respond</button>
        </form>
    )
}

export default PostComment;