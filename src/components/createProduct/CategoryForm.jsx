function CategoryForm({ 
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
}) {
    
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Categoría del Producto</label>
            
            {/* Verificación para asegurarse de que categories no es null o undefined */}
            <select
                className="w-full p-2 border rounded"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)} // Actualizar la categoría seleccionada
                required
            >
                <option value="">Selecciona una categoría</option>
                {categories && categories.map((category) => ( // Verifica que categories no sea null o undefined
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {errors.productCategory && <p className="text-red-500">{errors.productCategory}</p>}
            
            {/* Botón para alternar entre seleccionar una categoría y añadir una nueva */}
            <button 
                type="button" 
                className="text-blue-500 underline mt-2" 
                onClick={() => setIsAddingCategory(!isAddingCategory)}
            >
                {isAddingCategory ? 'Seleccionar una categoría existente' : 'Añadir nueva categoría'}
            </button>

            {/* Mostrar campos para agregar nueva categoría si el usuario selecciona esta opción */}
            {isAddingCategory && (
                <>
                    <input
                        type="text"
                        className="w-full p-2 mt-2 border rounded"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Nueva categoría"
                    />
                    <textarea
                        className="w-full p-2 mt-2 border rounded"
                        value={newCategoryDescription}
                        onChange={(e) => setNewCategoryDescription(e.target.value)}
                        placeholder="Descripción de la nueva categoría"
                    />
                    <button type="button" onClick={handleAddCategory} className="bg-customGreen text-white mt-2 p-2 rounded">
                        Añadir Categoría
                    </button>
                </>
            )}
        </div>
    );
}

export default CategoryForm;
