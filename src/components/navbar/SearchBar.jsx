const SearchBar = () => {
    return (
        <div className="flex items-center border border-gray-200 rounded-[5px] mt-2 w-full md:w-auto rounded-r-[5px] overflow-hidden">
            <img src="../../../public/img/Search.svg" alt="Search" className="h-5 w-5 ml-2" />
            <input
                type="text"
                placeholder="Búsqueda"
                className="pl-2 py-1 focus:outline-none w-full "
            />
<<<<<<< HEAD
            <button className="bg-customGreen text-white px-4 py-1 rounded-md md:rounded-lg">
=======
            <button className="bg-customGreen text-white px-4 py-1 rounded-r-[5px] ">
>>>>>>> 4d05b3f (DONE:Navbar link finish TODO:Cart)
                Búsqueda
            </button>
        </div>
    );
};

export default SearchBar;