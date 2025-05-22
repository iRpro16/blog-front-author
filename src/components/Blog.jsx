import { useParams } from "react-router-dom";
import { getBlog } from "../services/blog";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Header from "./Header";
import Comments from "./Comments";

const Blog = () => {
    let { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await getBlog(id);
                setPost(data.post);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    console.error('Error fetching post:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts: {error}</div>;
    if (!post) return <div>No post found.</div>;

    
    return (
        <div className="min-h-screen">
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full xl:max-w-6xl lg:max-w-5xl md:max-w-4xl">
                <div className="bg-white p-4 sm:p-6 md:p-8">
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <h1 className="text-6xl sm:text-6xl font-bold text-gray-900 mb-2">{post.heading}</h1>
                        <h3 className="text-xl sm:text-2xl text-gray-600 mb-4">{post.subheading}</h3>
                        <p className="font-semibold text-lg">Written by {post.user.name}</p>

                
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-4">
                            <div>
                                <span className="font-medium">Published:</span> {post.createdAt}
                            </div>
                            
                            {post.updatedAt && (
                                <div className="sm:ml-6">
                                    <span className="font-medium">Updated:</span> {post.updatedAt}
                                </div>
                            )}
                        </div>
                        
                    </div>
                    
                    <div className="prose max-w-none border-b border-gray-200 mb-10">
                        {parse(post.content)}
                    </div>
                    <Comments comments={post.comments} />
                </div>
            </div>
        </div>
    );
}

export default Blog;