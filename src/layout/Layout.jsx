import { Outlet } from "react-router-dom";
<<<<<<< HEAD

const Layout1 = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
=======
import Navbar from "../components/navbar/Navbar";


const Layout1 = () => {

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>

        </div>
    );
};

>>>>>>> 8f256a7c3e8bd5fc239fe64bd93ee89b1d0b2c23
export default Layout1;