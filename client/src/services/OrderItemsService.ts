import { IOrderItem } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const ORDERS_ITEMS_URL = "/orderItems";

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(`${ORDERS_ITEMS_URL}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.delete(`${ORDERS_ITEMS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const save = async (orderItem: IOrderItem): Promise<any> => {
  let response;
  try {
    response = await api.post(`${ORDERS_ITEMS_URL}`, orderItem);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findById = async (id: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${ORDERS_ITEMS_URL}/${id}`);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const page = async (page: number): Promise<any> => {
  let response;
  try {
    response = await api.get(`${ORDERS_ITEMS_URL}/page?page=${page}&size=12`);
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
