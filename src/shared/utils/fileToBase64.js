import { loadData, saveData } from "./storage";

const PRODUCT_KEY = "ak_library_products";

export function getProductLibrary() {
  return loadData(PRODUCT_KEY, []);
}

export function saveProductLibrary(products) {
  saveData(PRODUCT_KEY, products);
}