import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  externalPostsApiUrl:
    process.env.EXTERNAL_POSTS_API ||
    'https://jsonplaceholder.typicode.com/posts',
  externalUsersApiUrl:
    process.env.EXTERNAL_USERS_API ||
    'https://jsonplaceholder.typicode.com/users',
  port: process.env.PORT || 2000,
  database: {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'homework',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
}));
