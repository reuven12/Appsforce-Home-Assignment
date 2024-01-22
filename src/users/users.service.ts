import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  private readonly externalUsersApiUrl =
    'https://jsonplaceholder.typicode.com/users';

  fetchUsers(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get<any[]>(this.externalUsersApiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      }),
    );
  }

  async getUsers(): Promise<any[]> {
    try {
      const response = await lastValueFrom(this.fetchUsers());
      return response.data;
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw new Error('Failed to fetch users');
    }
  }
}
