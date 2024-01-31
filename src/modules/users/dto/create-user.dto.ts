import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';
import { Type } from 'class-transformer';
import { LANGUAGES } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty() // Bắt buộc phải gửi lên
  @MaxLength(50) // Tối đa 50 ký tự
  first_name: string;

  @IsNotEmpty()
  @MaxLength(50)
  last_name: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail() // Phải là định dạng email
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @IsStrongPassword() // Password phải đủ độ mạnh
  password: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto[];

  @IsOptional() // Không bắt buộc
  @IsArray() // Nếu có dữ liệu phải là dạng array
  @ArrayMinSize(1) // Array phải có tối thiểu 1 phần tử
  @IsEnum(LANGUAGES, { each: true }) // Các phần tử của array phải thuộc enum LANGUAGES
  interested_languages: LANGUAGES[];
}
