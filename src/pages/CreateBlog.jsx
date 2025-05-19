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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="heading">Heading: </label>
                <input 
                    type="text"
                    name="heading"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="subheading">Subheading: </label>
                <input 
                    type="text"
                    name="subheading"
                    onChange={handleChange}
                />
            </div>
            <Content formData={formData} setFormData={setFormData}/>
            <button onClick={handlePublished}>
                {publishedBlog ? 'Publish' : "Don't Publish"}
            </button>
            <button type="submit">Post blog</button>

        </form>
    )
}

export default CreateBlog;