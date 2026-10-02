import { useRef } from "react";
import { Camera, LogOut, MapPin, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/getImageUrl";
import { toast } from "sonner";
import { useUpdateProfileImage } from "../hooks/useProfile";
import type { Profile } from "../types/profile.types";

export type ProfileTab = "personal" | "password";

interface ProfileSidebarProps {
  profile?: Profile;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onLogout: () => void;
}

const menuItems = [
  { key: "personal" as const, label: "Personal information", icon: UserRound },
];

export default function ProfileSidebar({
  profile,
  activeTab,
  onTabChange,
  onLogout,
}: ProfileSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateImage = useUpdateProfileImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateImage.mutate(file, {
        onSuccess: () => toast.success("Profile photo updated"),
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Failed to update photo"),
      });
    }
    e.target.value = "";
  };

  return (
    <aside className="rounded-3xl bg-[#F5F6F8] px-8 pt-14 pb-16">
      {/* Avatar */}
      <div className="relative mx-auto w-fit">
        <Avatar className="size-30">
          <AvatarImage
            src={profile?.profile_image ? getImageUrl(profile.profile_image) : "images/avatar.png"}
            alt={profile?.name || "avatar"}
            className="object-cover"
          />
          <AvatarFallback>{profile?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={updateImage.isPending}
          aria-label="Change profile photo"
          className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full bg-[#2563EB] text-white ring-2 ring-[#F5F6F8] transition hover:bg-[#1D5FD1] disabled:opacity-60"
        >
          <Camera className="size-3.5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Name + location */}
      <h2 className="mt-4 text-center text-[22px] font-semibold text-slate-900">
        {profile?.name || "Your name"}
      </h2>
      <p className="mt-1.5 flex items-center justify-center gap-1 text-center text-[13px] text-gray-500">
        <MapPin className="size-3.5" />
        {profile?.location || "Add your location"}
      </p>

      {/* Menu */}
      <nav className="mt-8 flex flex-col gap-4">
        {menuItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            className={`flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] font-medium transition ${activeTab === key
                ? "border-2 border-[#2563EB] bg-white text-slate-900"
                : "border-2 border-transparent text-slate-800 hover:bg-white/70"
              }`}
          >
            <Icon className="size-[18px]" />
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-[15px] font-medium text-[#EF4444] transition hover:bg-red-50"
        >
          <LogOut className="size-[18px]" />
          Log out
        </button>
      </nav>
    </aside>
  );
}
