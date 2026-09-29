import type { AppointmentTab } from "../types/appointment.types";

interface IProps {

    activeTab: AppointmentTab;
    onChange: (tab: AppointmentTab) => void;

}
const tabs: { label: string; value: AppointmentTab }[] = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Upcoming",
        value: "Upcoming",
    },
    {
        label: "Completed",
        value: "Completed",
    },
    {
        label: "Canceled",
        value: "Cancelled",
    },
];

const AppointmentTabs = ({ activeTab, onChange }: IProps) => {
    return (
        <div className="flex max-w-full items-center gap-2 overflow-x-auto">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onChange(tab.value)}
                        className={`font-montserrat h-11 shrink-0 rounded-md px-4 py-2 text-base font-medium leading-[100%] transition ${isActive
                                ? "bg-app-main text-white"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}


        </div>
    )
}

export default AppointmentTabs