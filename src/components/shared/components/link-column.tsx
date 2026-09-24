import { sans, serif } from "@/types/home";

export default function LinkColumn({ title, items }: any) {
    return (
        <div>
            <h3 className={`${serif} text-[22px] leading-8`}>{title}</h3>
            <ul className={`${sans} mt-5 space-y-3 text-[15px]`}>
                {items.map((item: any) => (
                    <li key={item}>
                        <a href="#" className="transition-colors hover:text-sky-300">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
