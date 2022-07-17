import { User } from '../entities/user.entity';

export type UserResponse = Omit<User, 'password'>;

// export interface UserRepsonse = Omit<User, 'password'>;
