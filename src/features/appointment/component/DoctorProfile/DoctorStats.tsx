import {
  Award,
  MessageCircle,
  Star,

  UsersRound,
} from "lucide-react";

const DoctorStats = () => {
  const stats = [
    {
      icon: UsersRound,
      value: "2,000+",
      label: "Patients",
    },
    {
      icon: Award,
      value: "10+",
      label: "Experience",
    },
    {
      icon: Star,
      value: "4.5",
      label: "Rating",
    },
    {
      icon: MessageCircle,
      value: "1,872",
      label: "Reviews",
    },
  ];

  return (
    <div className="grid grid-cols-4 items-start mt-7">
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-14 h-14 p-[12.73px] bg-white rounded-[50%] flex items-center justify-center">
            <Icon
              size={19}
              strokeWidth={2}
              className="text-app-secondary"
              fill={"currentColor"}
            />
          </div>

          <p className="text-sm font-semibold leading-[150%] text-[#4B5563]">
            {value}
          </p>

          <p className="text-sm leading-[100%] text-[#6D7379]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DoctorStats;