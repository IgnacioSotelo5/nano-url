import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UIMode } from "src/auth/dto/onboarding.dto";

export class UserDto {
    @IsString()
    id: string

    @IsString()
    name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    filename?: string

    @IsEnum(UIMode)
    themePreference?: UIMode

    @IsString()
    language?: string

}
