import { PartialType } from '@nestjs/mapped-types';
import { CreateQrCodeDto } from './create-qr-code.dto';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';

export class UpdateQrCodeDto extends PartialType(CreateQrCodeDto) {
    link?: CreateLinkDto
}
