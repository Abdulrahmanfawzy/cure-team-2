import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useSpecialist from "../hooks/useSpecialist";
import type { SetURLSearchParams } from "react-router-dom";
import type { ChooseSpecialistType } from "../types/sort.type";

export const baseUrl="https://round-13-cure.huma-volve.com/"
const SPECIALIST_SKELETON_COUNT = 6;
const ChooseSpecialistCard = ({setSearchParam}:{setSearchParam:SetURLSearchParams}) => {
  const {data:specialist, isPending} = useSpecialist();
  const handelChoose =(name : string)=> {
    setSearchParam((prev :URLSearchParams) => {
    const next = new URLSearchParams(prev);
    next.set("major", name);
    next.delete("page");
    return next;
  });
  }  
  return (
    <section className="flex w-full min-w-0 flex-col gap-3 sm:gap-4 rounded-2xl border bg-white p-3.5 sm:p-5 shadow-sm">
      <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Choose Specialist</h2>
      <ScrollArea type="auto" className="w-full pb-2">
        {isPending ? (
          <div aria-busy="true" className="flex w-max gap-2 pb-2">
            {Array.from({ length: SPECIALIST_SKELETON_COUNT }, (_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-xl" />
            ))}
          </div>
        ) : (
        <div className="flex w-max gap-2 pb-2">
          {specialist?.map((item: ChooseSpecialistType) => (
            <Button
              key={`${item.name}-${item.id}`}
              className="cursor-pointer rounded-xl border border-neutral/30 hover:border-primary hover:bg-primary/5 transition-all text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
              variant="secondary"
              onClick={() => handelChoose(item.name)}
            >
              <img src={`${baseUrl}${item.icone}`} alt={item.name} className="size-4 sm:size-5 object-contain" />
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
        )}
      </ScrollArea>
    </section>
  );
};

export default ChooseSpecialistCard;
