import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <section className="flex-1">
      <div className="">
        <Input
          type="search"
          className="px-5 py-5 flex-1"
          placeholder="Search Doctor"
        />
      </div>
    </section>
  );
};
export default Search;
