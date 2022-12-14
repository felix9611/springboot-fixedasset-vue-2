import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { RemoveUserDto } from './dto/remove-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdataUserPasswordDto } from './dto/update-user-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): any;
    create(createUserDto: CreateUserDto): Promise<User>;
    remove(removeUserDto: RemoveUserDto, req: any): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    findAll(query: FindUserDto): Promise<User>;
    findAllFE(query: FindUserDto): Promise<User>;
    findOneById(params: RetrieveUserDto): Promise<any>;
    updatePassword(params: RetrieveUserDto, updataUserPasswordDto: UpdataUserPasswordDto): Promise<any>;
    resetPassword(params: RetrieveUserDto): Promise<any>;
    updateAvatar(id: string, updateUserAvatar: any): Promise<any>;
    getCount(): Promise<number>;
    getUserInfo(req: any): Promise<void>;
}
