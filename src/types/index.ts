import { Timestamp } from "firebase/firestore";

export type AuthInfo = {
  userID: string;
  name: string; 
  profilePhoto: string | null; 
  isAuth: boolean;
}

export type Transaction = {
  id?: string;
  userID: string | undefined;
  description: string, 
  transactionAmount: string | number, 
  transactionType: string, 
  createdAt?: Timestamp
}