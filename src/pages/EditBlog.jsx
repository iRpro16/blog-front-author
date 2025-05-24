import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Content from "../components/Content";
import { editBlog, getBlog } from "../services/blog";

const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [publishedBlog, setPublishedBlog] = useState(false);
    const [formData, setFormData] = useState(null);

    const finalData = { ...formData, published: publishedBlog };

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getBlog(id);
            setFormData({
                heading: data.post.heading,
                subheading: data.post.subheading,
                content: data.post.content
            });
            setPublishedBlog(data.post.published);
        };

        fetchPost();
    }, [id]);

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
            await editBlog(id, finalData);
            navigate("/");
        } catch (err) {
            console.error('Error editing data:', err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="heading">Heading: </label>
                <input 
                    type="text"
                    name="heading"
                    onChange={handleChange}
                    value={formData?.heading}
                />
            </div>
            <div>
                <label htmlFor="subheading">Subheading: </label>
                <input 
                    type="text"
                    name="subheading"
                    onChange={handleChange}
                    value={formData?.subheading}
                />
            </div>
            { formData && <Content formData={formData} setFormData={setFormData}/>}
            <button className="bg-blue-200 rounded-lg p-1" onClick={handlePublished}>
                {publishedBlog ? 'Published' : "Publish"}
            </button>
            <button type="submit">Post blog</button>

        </form>
    )
}

export default EditBlog;