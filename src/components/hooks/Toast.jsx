import { useState, useEffect, useCallback } from "react";

export const Toast = ({ message, type = 'success', duration = 2500, onClose, customClass }) => {
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClosing(true);

            setTimeout(() => {
                onClose();
            }, 300)
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleManualClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    }

    return (
        <div className={`toast toast-${type} ${isClosing ? 'toast-closing' : ''} ${customClass || ''}`}>
            <span>{message}</span>
            <button onClick={handleManualClose} className="toast-close">x</button>
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