import react from "react";

const ShoppingCart = () => {
    return (
        <div className="ml-4 flex items-center">
            <img src="/cart-icon.png" alt="Cart Icon" className="h-8 w-8" />
            <span className="ml-1 text-sm">$57.00</span>
        </div>
    );
};

export default ShoppingCart;