import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({ description: 'The Login usernme', example: 'ABC' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The Login Password', example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;

  userId: string;
  roles: [];
  status: boolean;
}
