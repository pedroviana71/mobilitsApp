export interface ICreateAccount {
  userId: string;
  name: string;
  color: string;
  balance: number;
}

export interface ICreateAppResponse extends ICreateAccount {
  _id: string;
  createdAt: string;
  isActive: boolean;
}
