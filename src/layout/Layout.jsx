import { Outlet } from "react-router-dom";

const Layout1 = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
export default Layout1;