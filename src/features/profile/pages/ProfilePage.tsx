import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { sans, serif } from "@/types/home";
import { PATHS } from "@/app/router";
import ProfileSidebar, { type ProfileTab } from "../components/ProfileSidebar";
import PersonalInformation from "../components/PersonalInformation";
import { useProfile } from "../hooks/useProfile";

const AUTH_SESSION_KEYS = [
  "auth_flow",
  "login_phone",
  "register_phone",
  "forgot_phone",
  "reset_token",
  "reset_phone",
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<ProfileTab>("personal");
  const { data: profile } = useProfile();

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    AUTH_SESSION_KEYS.forEach((key) => sessionStorage.removeItem(key));
    navigate(PATHS.signIn, { replace: true });
  };

  return (
    <div className={`${sans} container-main mx-auto px-6 py-14 lg:px-10 lg:py-16`}>
      <div className="grid items-start gap-10 lg:grid-cols-[317px_1fr] lg:gap-16">
        <ProfileSidebar
          profile={profile}
          activeTab={tab}
          onTabChange={setTab}
          onLogout={handleLogout}
        />

        <section>
          <h1 className={`${serif} mb-8 text-[26px] leading-8 text-slate-900`}>
            {tab === "personal" ? "Personal information" : "Password management"}
          </h1>

          <PersonalInformation profile={profile} />
        </section>
      </div>
    </div>
  );
}
