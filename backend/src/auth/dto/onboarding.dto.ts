import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, Length, MaxLength } from "class-validator"

export enum UIMode {
    light = 'light',
    dark = 'dark'
}
export enum JobType {
    Personal = 'Personal use',
    Marketing = 'Marketing',
    Developer = 'Developer',
    Insurance= 'Insurance',
    Media = 'Media',
    Education = 'Education',
    Financial = 'Banks & Financial Services',
    Other = 'Other'
}

export class OnboardingProfileDto{
    @IsString()
    @Length(2, 20)
    name: string

    @IsString()
    @IsOptional()
    filename?: string
    
    @IsEnum(UIMode)
    @IsOptional()
    themePreference?: UIMode
    
    @IsString()
    @IsOptional()
    @MaxLength(5)
    language?: string
}

export class OnboardingMetricsDto{
    @IsArray()
    @IsString({each: true})
    @ArrayNotEmpty()
    appUsage: string[] // Ej: Personal, Personalizacion de mensajes, QR personalizados, API developers, etc
   
    @IsEnum(JobType)
    @IsOptional()
    jobType?: JobType // Ej: Estudiante, Marketing, Programador, Educacion, etc 
}