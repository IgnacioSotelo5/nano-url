import { IsEnum, IsHexColor, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Length, ValidateNested } from "class-validator"

enum QrType{
    SVG = 'svg',
    PNG = 'png'
}

class QRColors {
    @IsHexColor()
    dark: string
    
    @IsHexColor()
    light: string
}

export class CreateQrCodeDto {
    @IsUrl({require_protocol: true}, {message: 'Please provide a valid URL including the protocol (e.g., http or https).'})
    @IsString()
    @IsNotEmpty()
    originalUrl: string
     
    @IsString()
    @Length(0, 20)
    @IsOptional()
    customShortUrl?: string

    @IsString()
    @IsOptional()
    customDomain?: string
    
    @IsString()
    @IsOptional()
    title?: string

    @ValidateNested()
    @IsOptional()
    color?: QRColors

    @IsEnum(QrType)
    @IsOptional()
    qrType?: QrType

    @IsString()
    @IsOptional()
    redirectionUrl: string
}
