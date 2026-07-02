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
          className="text-2xl my-2 mx-3 px-3 bg-gray-700 rounded-xl"
        />
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"
        >
          Search
        </button>
      </form>
    </div>
  );
}
