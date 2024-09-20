import react from "react";


const SearchBar = () => {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg mt-2 w-full md:w-auto">
            <input
                type="text"
                placeholder="Búsqueda"
                className="pl-2 py-1 rounded-l-lg focus:outline-none w-full"
            />
            <button className="bg-green-500 text-white px-4 py-1 rounded-r-lg">
                Búsqueda
            </button>
        </div>
    );
};

export default SearchBar;