
import React, { useEffect } from "react";
import TableToolbar from "../../components/common/TableToolbar";
import DataTable from "../../components/common/DataTable";
import AddCategoryModal from "../../components/common/category/AddCategoryModal";
import { useCategory } from "../../../hooks/useCategory";
import { useDispatch, useSelector } from "react-redux";
import { useCategoryModal } from "../../../hooks/useCategoryModal";

export const ManageCategories = () => {

    const dispatch = useDispatch();
    const { startLoadingCategories, setCategorySelected } = useCategory(dispatch);
    
    //se extrae propiedades y funciones desestructurando el hook useCategoryModal
    const { openCategoryModal } = useCategoryModal();

    const { categories: categoriesDB = [], currentPage, totalPages, isLoading, categorySelected } = useSelector((state) => state.category);

    useEffect(() => {
    startLoadingCategories(0, 5); // Carga inicial
  }, []); //

 
   //Maneja el abrir el modal al precionar el boton para agregar nueva nueva categoria
    const handleClicNewCategory = () => {

        //Limpia el formulario antes de abrir el modal (resetenado sus valores)
        //setCategorySelected(null); //Se limpia la categoria seleccionada
        setCategorySelected({
            nombreCategoria: '',
        });

        //Se abre el modal para agregar nueva categoria
        openCategoryModal(); 
    } 

  // Al hacer doble clic -> abrir modal con categoría seleccionada
    const onDoubleClick = (category) => {
      //console.log({ doubleClick: category });
      setCategorySelected(category); //opcional, para establecer la categoria seleccionada al hacer doble clic
      openCategoryModal(); 
    }

     // Al hacer clic -> marcar categoría como seleccionada
    const onSelect = (category) => {
      //console.log({ click: event });
      setCategorySelected(category);
    }

    //Cambiar de pagina
    const onPageChange = (newPage) => {
      startLoadingCategories(newPage, 5);
    };

    const columns = ["Categoria", "Opcion"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar 
        onAddClick={handleClicNewCategory}
        buttonLabel="Agregar"
        placeholder="Buscar categoría"
      />

       {isLoading ? (
        <div className="text-center py-5">Loading categories...</div>
      ) : (
 
      <DataTable 
        columns={columns} 
        data={categoriesDB} 
        type="category" 

        onSelect={onSelect}
        onDoubleClick={onDoubleClick}

        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        categorySelected={categorySelected}

      />

      )}

      <AddCategoryModal /> 
    </div>
  );
};

