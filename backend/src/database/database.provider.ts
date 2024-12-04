import { DATA_SOURCE } from "src/constants"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'

dotenv.config()

const {
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
} = process.env

export const databaseProvider = [
    {
        provide: DATA_SOURCE,
        useFactory: async ()=>{
            const dataSource = new DataSource({
                type: 'mysql',
                host: DATABASE_HOST,
                port: parseInt(DATABASE_PORT),
                username: DATABASE_USERNAME,
                password: DATABASE_PASSWORD,
                database: DATABASE_NAME,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}'
                ],
                migrations: [
                    __dirname + '../migrations/*{.ts, .js}',
                ],
                //Sincroniza la base de datos con el esquema de las entidades en cada ejecución
                synchronize: process.env.NODE_ENV === 'production' ? false : true, //sync: true no deberia usarse en produccion ya que se puede perder data de produccion
            })

            return dataSource.initialize()
        }
    }
]
