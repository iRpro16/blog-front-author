import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Blog from "./components/Blog";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/signup",
        element: <SignupForm />
    },
    {
        path: "/create",
        element: <CreateBlog />
    },
    {
        path: "/blog/:id",
        element: <Blog />
    },
    {
        path: "/blog/edit/:id",
        element: <EditBlog />
    }
])

export default router;