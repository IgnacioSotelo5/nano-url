import { DataSource } from "typeorm";
import { QrCode } from "./entities/qr-code.entity";
import { DATA_SOURCE, QR_CODE_REPOSITORY } from "src/constants";

export const qrCodeProvider = [
    {
        provide: QR_CODE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(QrCode),
        inject: [DATA_SOURCE]

    }
]