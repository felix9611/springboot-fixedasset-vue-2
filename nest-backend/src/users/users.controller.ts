import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { RemoveUserDto } from './dto/remove-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdataUserPasswordDto } from './dto/update-user-password.dto';
import { UpdataUserAvatarDto } from './dto/update-user-avatar.dto';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { Log } from 'src/libs/utils';
@ApiTags('User')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuardUser)
  @Get('profile')
  @ApiOperation({ summary: 'Get User Detail' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuardUser)
  @Post()
  @ApiOperation({ summary: 'Create User' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: 'Void User' })
  async remove(
    @Body() removeUserDto: RemoveUserDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.usersService.delete(removeUserDto);
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.usersService.update({
      id,
      updateUserDto,
    });
  }

  // 列表
  // @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({ summary: 'Listing POST' })
  async findAll(@Body() query: FindUserDto): Promise<User> {
    return await this.usersService.findAll(query);
  }

  // @UseGuards(JwtAuthGuardUser)
  @Get('list')
  @ApiOperation({ summary: 'Listing GET' })
  async findAllFE(@Query() query: FindUserDto): Promise<User> {
    return await this.usersService.findAll(query);
  }

  // 根据 id 查找
  @Get(':id')
  @ApiOperation({ summary: 'Find By Id' })
  async findOneById(@Param() params: RetrieveUserDto): Promise<any> {
    return await this.usersService.findOneById(params.id);
  }

  // 根据 id 更新密码
  @UseGuards(JwtAuthGuardUser)
  @Put('password/:id')
  @ApiOperation({ summary: 'Update Password' })
  async updatePassword(
    @Param() params: RetrieveUserDto,
    @Body() updataUserPasswordDto: UpdataUserPasswordDto,
  ): Promise<any> {
    return await this.usersService.updatePassword({
      id: params.id,
      body: updataUserPasswordDto,
    });
  }

  // 根据 id 重置密码
  @UseGuards(JwtAuthGuardUser)
  @Put('password/reset/:id')
  @ApiOperation({ summary: 'Reset Password' })
  async resetPassword(@Param() params: RetrieveUserDto): Promise<any> {
    return await this.usersService.resetPassword(params);
  }

  // 根据 id 设置头像
  @Put('avatar/:id')
  @ApiOperation({ summary: 'Setting Avatar' })
  async updateAvatar(
    @Param('id') id: string,
    @Body() updateUserAvatar: any,
  ): Promise<any> {
    return await this.usersService.updateAvatar({
      id,
      updateUserAvatar,
    })
  }

  // 数量
  @Get('list/count')
  @ApiOperation({ summary: 'Users Count' })
  async getCount() {
    return await this.usersService.getCount();
  }

  @ApiOperation({ summary: 'User Info' })
  @Get('userInfo')
  @UseGuards(JwtAuthGuardUser)
  async getUserInfo(@Request() req: any) {
    console.log('catch here', req.user)
  }

}
