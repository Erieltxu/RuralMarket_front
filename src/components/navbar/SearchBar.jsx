


const SearchBar = () => {
    return (
        <div className="flex items-center border border-gray-300 rounded-md mt-2 w-full md:w-auto">
            <img src="../../../public/img/Search.svg" alt="Search" className="h-5 w-5 ml-2" />
            <input
                type="text"
                placeholder="Búsqueda"
                className="pl-2 py-1  rounded-md focus:outline-none w-full "
            />
            <button className="bg-green-500 text-white px-4 py-1 rounded-r-md  ">
                Búsqueda
            </button>
        </div>
    );
};

export default SearchBar;