import React from 'react';

const ProductDetails = ({
    productName,
    setProductName,
    productPrice,
    setProductPrice,
    productStock,
    setProductStock,
    seller,
    setSeller,
    productImage,
    handleImageChange,
    errors
}) => {
    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nombre del producto</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.productName ? 'border-red-500' : ''}`}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="productPrice" className="block text-gray-700">Precio:</label>
                <input
                    type="text"
                    id="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)} // No reemplaces nada, muestra lo que el usuario introduce
                    placeholder="Ej: 2,00"
                    className="w-full p-2 border rounded-md"
                />
                {errors.productPrice && <p className="text-red-500">{errors.productPrice}</p>}
            </div>


            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Stock</label>
                <input
                    type="number"
                    className={`w-full p-2 border rounded ${errors.productStock ? 'border-red-500' : ''}`}
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    required
                />
                {errors.productStock && <p className="text-red-500">{errors.productStock}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Vendedor</label>
                <input
                    type="text"
                    className={`w-full p-2 border rounded ${errors.seller ? 'border-red-500' : ''}`}
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    required
                />
                {errors.seller && <p className="text-red-500">{errors.seller}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagen del producto</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                {errors.productImage && <p className="text-red-500">{errors.productImage}</p>}
            </div>
        </>
    );
};

export default ProductDetails;
