import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
    @IsOptional()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {message: 'The password must contain a minimum of 8 characters and at least one uppercase letter, one lowercase letter, one number and one special character.'})
    password?: string
}
