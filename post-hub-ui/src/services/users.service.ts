import HttpClient from '../utils/http.client';
import config from '../config';
import { User } from '../models/users.interfaces';
const { users, baseUrl } = config.api;
export class UsersService {
  static getUsers = async (): Promise<User[]> => {
    return (await HttpClient.get(`${baseUrl}${users}`)).data as User[];
  };
}
