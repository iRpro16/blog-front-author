import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }

    return (
        <header>
            <div>
                <h1>Image will go here</h1>
                <h1>Blog</h1>
            </div>
            <div>
                <h2>Profile</h2>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </header>
    )
}

export default Header;