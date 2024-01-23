"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let UsersService = class UsersService {
    constructor(httpService) {
        this.httpService = httpService;
        this.externalUsersApiUrl = 'https://jsonplaceholder.typicode.com/users';
    }
    fetchUsers() {
        return this.httpService.get(this.externalUsersApiUrl).pipe((0, operators_1.map)((response) => {
            return response.data.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                address: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
            }));
        }), (0, operators_1.catchError)((error) => {
            console.error('Error fetching users:', error);
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UsersService);
//# sourceMappingURL=users.service.js.map