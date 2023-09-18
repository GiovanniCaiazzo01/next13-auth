import { IUser } from ".";

export interface IResponse {
  readonly result: boolean;
  readonly data?: IUser | null;
  readonly message?: string;
}
