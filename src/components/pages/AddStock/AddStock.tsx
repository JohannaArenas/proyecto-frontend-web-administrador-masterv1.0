import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "vm";
import { BreadCrums } from "../../containers/ContainerForUseSidebar/ContainerForUseSidebar";
import { SUB_SECTION_ROUTE_PRODUCTS_ADD, SUB_SECTION_ROUTE_PRODUCTS_ADD_STOCK } from "../../Sidebar/subsections";
import { AddStockForm } from "./AddStockForm/AddStockForm";


export const AddStock = () => {
  
  const breadcrumb: BreadCrums = {
    section_name: SUB_SECTION_ROUTE_PRODUCTS_ADD_STOCK.name,
    route: SUB_SECTION_ROUTE_PRODUCTS_ADD_STOCK.path,
  };

  const { setBreadcrums } = useOutletContext<Context>();

  useEffect(() => {
    document.title = SUB_SECTION_ROUTE_PRODUCTS_ADD.name;
    setBreadcrums(breadcrumb);
  }, []);

  return (
    <AddStockForm/>
  )
}