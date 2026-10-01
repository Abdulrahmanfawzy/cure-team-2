import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  return (
    <section className="flex-1">
      <div className="">
        <Input
          type="search"
          className="px-5 py-5 flex-1"
          placeholder="Search Doctor"
          value={searchParam.get("search") || ""}
          onChange={(e) => setSearchParam({ search: e.target.value })}
        />
      </div>
    </section>
  );
};
export default Search;
