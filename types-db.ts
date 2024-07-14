import { Timestamp } from "firebase/firestore/lite";
export interface Products {
    id: string;
    name: string;
    price: number;
    Details: string;
    DetailsInfo: string;
    images: { url: string }[];
    isFeatured: boolean;
    isArchived: boolean;
    category: string;
    size: string;
    kitchen: string;
    cuisine: string;
    qty: number;
  }

  export interface Category {
    id: string;
    billboardId: string;
    billboardLabel: string;
    name: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    imageUrl?: string;
  }

  export interface Size {
    id: string;
    name: string;
    value: string;
  }

  export interface Kitchen {
    id: string;
    name: string;
    value: string;
  }

  export interface Cuisines {
    id: string;
    name: string;
    value: string;
  }

  export interface Orders {
    id: string;
    name: string;
    value: string;
    isPaid : boolean;
    phone : string;
    customerName: string, 
    orderItems : Products[];
    address : string;
    order_status : string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
  }

  export interface Blog {
    id: string;
    label: string;
    ContentLabel: string;
    imageUrl: string;
    createdAt: Timestamp;
}