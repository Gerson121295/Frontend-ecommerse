


import React, { useEffect } from "react";
import TableToolbar from "../../components/common/TableToolbar";
import DataTable from "../../components/common/DataTable";
import AddCategoryModal from "../../components/common/AddCategoryModal";
import { useCategory } from "../../../hooks/useCategory";
import { useDispatch, useSelector } from "react-redux";
import { useCategoryModal } from "../../../hooks/useCategoryModal";
import { DeleteCategoryButton } from "../../components/common/product/DeleteCategoryButton";

export const ManageCategories = () => {

    const dispatch = useDispatch();
    const { startLoadingCategories, setCategorySelected } = useCategory(dispatch);
    
    //se extrae propiedades y funciones desestructurando el hook useCategoryModal
    const { openCategoryModal } = useCategoryModal();

    const { categories: categoriesDB, currentPage, totalPages, isLoading, categorySelected } = useSelector((state) => state.category);

    useEffect(() => {
    startLoadingCategories(0, 5); // Carga inicial
  }, []); //

  // Estado para controlar la visibilidad del modal
/*   const handleAddClick = () => {
    //dispatch(onOpenCategoryModal());
    openCategoryModal();
  }; */

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

    const columns = ["Categoria"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar 
         /*  buttonLabel="Add Category" //version anterior
          onButtonClick={handleAddClick}  */
      />
       {isLoading ? (
        <div className="text-center py-5">Loading categories...</div>
      ) : (
        <>
        
        <DeleteCategoryButton  /> 
       
   
   
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
         </>
      )}

      <AddCategoryModal /> 
    </div>
  );
};
