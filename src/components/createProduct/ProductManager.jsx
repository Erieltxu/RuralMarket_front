import React, { useState } from 'react';
import CreateProductForm from '../createProduct/CreateProductForm'
import ProductTable from '../createProduct/ProductTablet';

function ProductManager() {
    const [products, setProducts] = useState([]);

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <div>
            <CreateProductForm addProduct={addProduct} />
            <ProductTable products={products} />
        </div>
    );
}

export default ProductManager;
