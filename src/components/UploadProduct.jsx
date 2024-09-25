import React from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function UploadProduct() {
    return (
        <div className="App">
          
            <ProductForm addProduct={(product) => {
                console.log('Producto agregado: ', product); 
             
            }} />

           
            <ProductList />
        </div>
    );
}

export default  UploadProduct
