export interface ICreateAccount {
  userId: string;
  name: string;
  color: string;
  balance: number;
}

export interface IAccountResponse extends ICreateAccount {
  _id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
