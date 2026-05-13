import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Determine responsive toast position
const getToastPosition = () => {
    return window.innerWidth < 640 ? "bottom-center" : "top-right";
};

export const handleSuccess = (msg)=>{
    toast.success(msg,{
        position: getToastPosition(),
        autoClose: 3000,
    })
}

export const handleError = (msg)=>{
    toast.error(msg,{
        position: getToastPosition(),
        autoClose: 3000,
    })
}