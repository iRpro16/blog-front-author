import { useState } from "react";
import Content from "../components/Content";
import { createBlog } from "../services/blog";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [publishedBlog, setPublishedBlog] = useState(false);
    const [formData, setFormData] = useState({
        heading: '',
        subheading: '',
        content: '',
    })
    const finalData = { ...formData, published: publishedBlog };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    const handlePublished = (e) => {
        e.preventDefault()
        publishedBlog ? setPublishedBlog(false) : setPublishedBlog(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createBlog(finalData);
            navigate("/");
        } catch (err) {
            console.error('Error creating data:', err);
        }
    }
    
    return (
        <form 
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6"
        >
            <div className="space-y-2">
                <label htmlFor="heading" className="block text-lg font-semibold">Heading: </label>
                <input 
                    type="text"
                    name="heading"
                    onChange={handleChange}
                    value={formData?.heading}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your blog heading"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="subheading" className="block text-lg font-semibold">Subheading: </label>
                <input 
                    type="text"
                    name="subheading"
                    onChange={handleChange}
                    value={formData?.subheading}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your blog subheading"
                />
            </div>

            { formData && (
                <div>
                    <Content formData={formData} setFormData={setFormData} />
                </div>
            )}

            <div className="flex items-center gap-4">
                <button 
                    type="button"
                    onClick={handlePublished}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        publishedBlog
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                >
                {publishedBlog ? 'Published' : 'Publish'}
            </button>

            <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200" 
            > 
                Create Blog
            </button>
            </div>
        </form>
    )
}

export default CreateBlog;