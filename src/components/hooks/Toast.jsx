import { useState, useEffect, useCallback } from "react";

export const Toast = ({ message, type = 'success', duration = 3000, onClose, customClass }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration)

        return () => clearTimeout(timer);
    }, [duration, onClose])

    return (
        <div className={`toast toast-${type} ${customClass || ''}`}>
            <span>{message}</span>
            <button onClick={onClose} className="toast-close">x</button>
        </div>
    ); 
};

// export default Toast;

export const useToast = () => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() })
    }, []);

    const hideToast = () => {
        setToast(null);
    };

    return { toast, showToast, hideToast }
};