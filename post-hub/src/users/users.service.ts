import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDto } from './users.dto';
import { ConfigType } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import appConfig from '../../config';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  private readonly externalUsersApiUrl = this.config.externalUsersApiUrl;

  fetchUsers(): Observable<UserDto[]> {
    return this.httpService.get<any[]>(this.externalUsersApiUrl).pipe(
      map((response) => {
        return response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          address: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      }),
    );
  }
}
