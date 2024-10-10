import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { CartProvider } from '../context/CartContext';

const Layout1 = () => {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen"> 
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </CartProvider>
    );
};

export default Layout1;