export interface ICreateCreditCard {
  userId: string;
  name: string;
  color: string;
  limit: number;
  dueDay: number;
  closingDay: number;
}

export interface ICreditCardResponse extends ICreateCreditCard {
  _id: string;
  createdAt: string;
  isActive: boolean;
}
