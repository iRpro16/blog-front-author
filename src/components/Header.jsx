import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }

    return (
        <header className="flex justify-between p-10 border-b-2">
            <div className="flex">
                <h1>Image will go here</h1>
                <h1>Blog</h1>
            </div>
            <div className="flex gap-5">
                <h2>Profile</h2>
                <button className="cursor-pointer" onClick={handleLogout}>Log out</button>
            </div>
        </header>
    )
}

export default Header;