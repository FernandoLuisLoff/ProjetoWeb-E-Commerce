import { IOrder } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const ORDERS_URL = "/orders";

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(`${ORDERS_URL}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${ORDERS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const save = async (order: IOrder): Promise<any> => {
  let response;
  try {
    response = await api.post(`${ORDERS_URL}`, order);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${ORDERS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const page = async (page: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${ORDERS_URL}/page?page=${page}&size=12`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
}

const OrderService = {
  findAll,
  remove,
  save,
  page,
  findById,
};

export default OrderService;
