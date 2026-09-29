import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChooseSpecialist } from "../constants/Sort";

const ChooseSpecialistCard = () => {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4 rounded-xl border p-5">
      <h2 className="text-2xl font-normal">Choose Specialist</h2>
      <ScrollArea type="always" className="w-full pb-2">
        <div className="flex w-max gap-2 pb-2">
          {ChooseSpecialist.map((item, index) => (
            <Button
              key={`${item.name}-${index}`}
              className="cursor-pointer rounded-xl border border-neutral"
              variant="secondary"
            >
              <img src={item.img} alt={item.name} />
              {item.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ChooseSpecialistCard;
