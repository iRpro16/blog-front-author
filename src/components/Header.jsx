import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const goToCreatePost = () => {
        navigate("/create");
    };

    return (
        <header className="flex justify-between items-center px-10 py-6 border-b shadow-sm bg-white">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    IMG
                </div>
                <h1 className="text-2xl font-bold text-gray-800">My Blog</h1>
            </div>

            <div className="flex items-center gap-5">
                <button
                    onClick={goToCreatePost}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200"
                >
                    + Create Post
                </button>

                <h2 className="text-gray-700 cursor-pointer hover:underline">Profile</h2>

                <button
                    className="text-red-500 hover:text-red-600 font-medium"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </header>
    );
};

export default Header;