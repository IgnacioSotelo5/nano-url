import { Module } from "@nestjs/common";
import { RedirectController } from "./redirect.controller";
import { ClicksService } from "src/clicks/clicks.service";
import { LinksService } from "src/links/links.service";
import { linksProvider } from "src/links/links.provider";
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/user/user.provider";
import { qrCodeProvider } from "src/qr-code/qr-code.provider";
import { QrCodeService } from "src/qr-code/qr-code.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ClicksService,
        LinksService,
        QrCodeService,
        ...linksProvider,
        ...userProvider,
        ...qrCodeProvider
    ],
    controllers: [RedirectController]
})
export class RedirectModule{}