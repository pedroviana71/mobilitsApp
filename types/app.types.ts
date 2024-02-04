export interface ICreateApp {
  name: string[];
  userId: string;
}

export interface ICreateAppResponse extends ICreateApp {
  _id: string;
}
