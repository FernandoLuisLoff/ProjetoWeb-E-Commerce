import { IProduct } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const PRODUCTS_URL = "/products";

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PRODUCTS_URL}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${PRODUCTS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const save = async (product: IProduct): Promise<any> => {
  let response;
  try {
    response = await api.post(`${PRODUCTS_URL}`, product);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PRODUCTS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const pageByCategory = async (page: number, categoryId: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PRODUCTS_URL}/listByCategory/${categoryId}?page=${page}&size=12`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
}

const page = async (page: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${PRODUCTS_URL}/page?page=${page}&size=12`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
}

const ProductService = {
  findAll,
  remove,
  save,
  pageByCategory,
  page,
  findById,
};

export default ProductService;
