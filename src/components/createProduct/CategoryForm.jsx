import React from 'react';


const CategoryForm = ({
    productCategory,
    setProductCategory,
    categories,
    isAddingCategory,
    setIsAddingCategory,
    newCategory,
    setNewCategory,
    newCategoryDescription,
    setNewCategoryDescription,
    handleAddCategory,
    errors
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Categoría</label>
            <select
                className={`w-full p-2 border rounded ${errors.productCategory ? 'border-red-500' : ''}`}
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
            >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {errors.productCategory && <p className="text-red-500">{errors.productCategory}</p>}

            {/* Botón para agregar nueva categoría */}
            {!isAddingCategory ? (
                <button
                    type="button"
                    className="mt-2 text-blue-500"
                    onClick={() => setIsAddingCategory(true)}
                >
                    Agregar nueva categoría
                </button>
            ) : (
                <div className="mt-2">
                    <input
                        type="text"
                        placeholder="Nombre de la nueva categoría"
                        className="w-full p-2 border rounded"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Descripción de la nueva categoría"
                        className="w-full p-2 border rounded mt-2"
                        value={newCategoryDescription}
                        onChange={(e) => setNewCategoryDescription(e.target.value)}
                    />
                    <button
                        type="button"
                        className="mt-2 text-green-500"
                        onClick={handleAddCategory}
                    >
                        Guardar categoría
                    </button>
                    
                </div>

            )}
        </div>
    );
};

export default CategoryForm;
