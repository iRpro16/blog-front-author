import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import CreateBlog from "./pages/CreateBlog";
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
    }
])

export default router;