import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  avatar: string

  @ApiProperty()
  roles: string[];

  @ApiProperty()
  intro: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  updatedAt: Date;
}
