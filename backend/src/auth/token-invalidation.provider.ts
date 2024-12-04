import { INVALIDATE_TOKEN_REPOSITORY, DATA_SOURCE } from "src/constants";
import { DataSource } from "typeorm";
import { InvalidatedToken } from "./entities/token-invalidated.entity";

export const invalidationTokenProvider = [
    {
        provide: INVALIDATE_TOKEN_REPOSITORY,
        useFactory: async (dataSource: DataSource) => dataSource.getRepository(InvalidatedToken),
        inject: [DATA_SOURCE]
    }
]