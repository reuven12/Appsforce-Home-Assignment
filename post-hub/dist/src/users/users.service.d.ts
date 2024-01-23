import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { UserDto } from './users.dto';
export declare class UsersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly externalUsersApiUrl;
    fetchUsers(): Observable<UserDto[]>;
}
