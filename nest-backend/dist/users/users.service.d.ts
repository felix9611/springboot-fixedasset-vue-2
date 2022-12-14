import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { RemoveUserDto } from './dto/remove-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    delete(removeUserDto: RemoveUserDto): Promise<any>;
    update(updateUserData: any): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneByName(username: string): Promise<any>;
    findOneById(id: string): Promise<any>;
    updatePassword(data: any): Promise<any>;
    resetPassword(params: any): Promise<any>;
    updateAvatar(data: any): Promise<any>;
    getCount(): Promise<number>;
}
