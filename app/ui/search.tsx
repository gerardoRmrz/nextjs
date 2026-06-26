import { searchResult } from "../actions/blogs";

export default function Search() {
  return (
    <div>
      <form action={searchResult}>
        <input
          type="text"
          name="searchTerm"
          placeholder="search"
          defaultValue=""
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
