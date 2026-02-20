import React, { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "error" | "success" | "warning" | "info";
  onClose?: () => void;
}

const icons = {
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgColors = {
  error: "bg-red-500/10 border-red-500/20",
  success: "bg-green-500/10 border-green-500/20",
  warning: "bg-yellow-500/10 border-yellow-500/20",
  info: "bg-blue-500/10 border-blue-500/20",
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const [activeMessage, setActiveMessage] = useState(message);
  const [activeType, setActiveType] = useState(type);
  const [animClass, setAnimClass] = useState("animate-slide-in");
  const [shouldRender, setShouldRender] = useState(!!message);

  useEffect(() => {
    if (message) {
      if (shouldRender && message !== activeMessage) {
        // Slide out old message
        setAnimClass("animate-slide-out");
        const timer = setTimeout(() => {
          setActiveMessage(message);
          setActiveType(type);
          setAnimClass("animate-slide-in");
        }, 400); // match duration in globals.css
        return () => clearTimeout(timer);
      } else if (!shouldRender) {
        setActiveMessage(message);
        setActiveType(type);
        setShouldRender(true);
        setAnimClass("animate-slide-in");
      }
    }
  }, [message, type, activeMessage, shouldRender]);

  const handleClose = () => {
    setAnimClass("animate-slide-out");
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 400);
  };

  if (!shouldRender || !activeMessage) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 ${animClass}`}>
      <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl min-w-[300px] max-w-md ${bgColors[activeType]}`}>
        <div className="shrink-0">
          {icons[activeType]}
        </div>
        <div className="flex-1">
          <p className="font-source-code-pro text-sm text-neutral-200 leading-relaxed">
            {activeMessage}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 p-1 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-500/10 transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}