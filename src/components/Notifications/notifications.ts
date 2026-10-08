import { toast } from "react-toastify";

export const NotifyError = (message: string, duration: number = 1000) => {
  toast.error(message, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const NotifySuccess = (message: string, duration: number = 1000) => {
  toast.success(message, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
