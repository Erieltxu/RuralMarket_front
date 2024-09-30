import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    return (
        <div className="m-4 flex items-center">
            <Link to="/store">
                <img src="../../../public/img/cart.svg" alt="Cart Icon" className="h-6 w-6" />
                <span className="ml-1 text-sm"></span>
            </Link>
        </div>
    );
};

export default ShoppingCart;


