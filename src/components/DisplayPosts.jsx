import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blog";
import { Trash, Pencil, EllipsisVertical  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Published from "./Published";
import { deleteBlog } from "../services/blog";

const DisplayPosts = () => {
    const [allPosts, setAllPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await getAllBlogs();
                setAllPosts(data.allPosts);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    console.error('Error fetching posts:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const toggleDropdown = (postId) => {
        if (openDropdownId === postId) {
            setOpenDropdownId(null);
        } else {
            setOpenDropdownId(postId);
        }
    };

    const handleClickOutside = () => {
        setOpenDropdownId(null);
    }

    const handleDelete = async (postId) => {
        try {
            await deleteBlog(postId);
            setOpenDropdownId(null);

            // remove from array
            setAllPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEdit = (postId) => {
        // handle edit
        console.log(postId);
        setOpenDropdownId(null);
    };

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts: {error}</div>;
    if (!allPosts || allPosts.length === 0) return <div>No posts found.</div>;

    return (
        <div className="flex flex-col gap-6 w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 mx-auto p-4" onClick={handleClickOutside}>
            {allPosts.map(post => (
                <div 
                    key={post.id} 
                    className="bg-white p-4 relative border-b-1 border-gray-400"
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/blog/${post.id}`);
                    }}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-grow">
                            <div className="flex gap-5">
                                <h2 className="text-3xl font-bold">{post.heading}</h2>
                                <Published isPublished={post.published}/>
                            </div>
                            <h4 className="text-xl text-gray-600">{post.subheading}</h4>
                        </div>
                        <div
                            className="menu-trigger cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(post.id);
                            }}
                        >
                            <EllipsisVertical size={25}/>
                        </div>
                    </div>

                    {/* Dropdown menu */}
                    {openDropdownId === post.id && (
                        <div className="dropdown-menu absolute right-2 top-10 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-32 py-1">
                            <ul>
                                <DropdownItem 
                                    postId={post.id} 
                                    icon={<Pencil size={16}/>} 
                                    functionHandler={handleEdit} 
                                    buttonType="Edit"
                                />
                                <DropdownItem 
                                    postId={post.id} 
                                    icon={<Trash size={16}/>} 
                                    functionHandler={handleDelete} 
                                    buttonType="Delete"
                                />
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

const DropdownItem = ({ postId, icon, functionHandler, buttonType }) => {
    return (
        <li 
            className="item flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            onClick={(e) => {
                e.stopPropagation();
                functionHandler(postId);
            }}
        >
            <span className="text-gray-600">{icon}</span>
            <span>{buttonType}</span>
        </li>
    )
}

export default DisplayPosts;