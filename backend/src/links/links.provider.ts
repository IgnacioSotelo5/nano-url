import { DataSource } from "typeorm";
import { Link } from "./entities/link.entity";
import { DATA_SOURCE, LINKS_REPOSITORY } from "src/constants";

export const linksProvider = [
    {
        provide: LINKS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Link),
        inject: [DATA_SOURCE] 
    }
]