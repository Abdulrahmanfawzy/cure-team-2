import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSpecialist from "../hooks/useSpecialist";
import { useSearch } from "../hooks/useSearch";

const ChooseSpecialistCard = ({setSearchParam}:{setSearchParam:UseSearchType}) => {
  const {data:specialist } = useSpecialist();
  console.log(specialist);
  const baseUrl="https://round-13-cure.huma-volve.com/"
  const handelChoose =(name : string)=> {
    setSearchParam((prev :URLSearchParams) => {
    const next = new URLSearchParams(prev);
    next.set("major", name);
    next.delete("page");
    return next;
  });
  }  
  return (
    <section className="flex w-full min-w-0 flex-col gap-4 rounded-xl border p-5">
      <h2 className="text-2xl font-normal">Choose Specialist</h2>
      <ScrollArea type="always" className="w-full pb-2">
        <div className="flex w-max gap-2 pb-2">
          {specialist?.map((item, index) => (
            <Button
              key={`${item.name}-${index}`}
              className="cursor-pointer rounded-xl border border-neutral"
              variant="secondary"
              onClick={() => handelChoose(item.name)}
            >
              <img src={`${baseUrl}${item.icone}`} alt={item.name} />
              {item.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ChooseSpecialistCard;
