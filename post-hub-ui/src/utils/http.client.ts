import axios from 'axios';

export default class HttpClient {
  static async get(url: string) {
    try {
      return await axios.get(url);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async delete(url: string) {
    try {
      return await axios.delete(url);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
