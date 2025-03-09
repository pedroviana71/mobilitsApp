export interface ICreateTransaction {
  userId: string;
  amount: number;
  title: string;
  description?: string;
  type: 'expense' | 'revenue';
  paymentType: 'single' | 'recurring' | 'installment';
  transactionDate: string;
  creditCardId?: string;
  accountId?: string;
  installments?: number;
  recurringStartDate?: string;
  recurringEndDate?: string;
}

export interface ITransactionResponse extends ICreateTransaction {
  _id: string;
  createdAt: string;
  updatedAt: string;
  installmentDates: Date[];
}
