import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Upload } from "lucide-react";

export function WelcomeUser({ onLogout }: { onLogout: () => void }) {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-6 relative group">
      {/* Avatar circle */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {user?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}

        {/* Hover options */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">
          <button
            onClick={triggerUpload}
            className="p-2 rounded-full bg-white text-black hover:bg-gray-200"
            title="Upload Photo"
          >
            <Upload size={16} />
          </button>
          <button
            onClick={onLogout}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Username */}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Welcome, {user?.name ?? "Guest"}
      </p>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
