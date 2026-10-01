import { Input } from "@/components/ui/input";
import { useSearchParams, type SetURLSearchParams } from "react-router-dom";

type SearchProps = {
  searchParam?: URLSearchParams;
  setSearchParam?: SetURLSearchParams;
};

const Search = ({ setSearchParam: propSetSearchParam, searchParam: propSearchParam }: SearchProps) => {
  const [internalSearchParams, internalSetSearchParams] = useSearchParams();
  const searchParam = propSearchParam ?? internalSearchParams;
  const setSearchParam = propSetSearchParam ?? internalSetSearchParams;

  const searchValue = searchParam.get("search") || "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParam(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set("search", value);
        } else {
          next.delete("search");
        }
        next.delete("page");
        return next;
      },
      { replace: true }
    );
  };

  return (
    <section className="flex-1">
      <div>
        <Input
          type="search"
          className="px-5 py-5 flex-1"
          placeholder="Search Doctor"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </section>
  );
};

export default Search;
