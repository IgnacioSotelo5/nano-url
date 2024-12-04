import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, Length, ValidateNested } from "class-validator"
import { CreateQrCodeDto } from "src/qr-code/dto/create-qr-code.dto"

export class CreateLinkDto {
    @IsString()
    @IsUrl({require_protocol: true}, {message: 'Please provide a valid URL including the protocol (e.g., http or https).'})
    @IsNotEmpty()
    originalUrl: string

    @Length(0, 20)
    @IsOptional()
    customShortUrl?: string

    @IsString()
    @IsOptional()
    customDomain?: string

    @IsOptional()
    @IsString()
    title?: string

    @IsBoolean()
    @IsOptional()
    generateQRCode: boolean

    @ValidateNested()
    qrCodeDto?: CreateQrCodeDto
}
