import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InvalidatedToken } from "./entities/token-invalidated.entity";
import { INVALIDATE_TOKEN_REPOSITORY } from "src/constants";

@Injectable()
export class InvalidationTokenService{
    constructor(
        @Inject(INVALIDATE_TOKEN_REPOSITORY)
        private readonly tokenRepository: Repository<InvalidatedToken>
    ){}

    async invalidateToken(token: string): Promise<void> {
        const existingToken = await this.tokenRepository.findOne({ where: { token } });
        if (!existingToken) {
            const invalidatedToken = this.tokenRepository.create({ token, invalidatedAt: new Date() });
            await this.tokenRepository.save(invalidatedToken);
        } else {
            console.error('Token already invalidated.');
        }
    }

    async isTokenInvalidated(token: string): Promise<boolean>{
        const invalidatedToken = await this.tokenRepository.findOne({
            where : {
                token
            }
        })
        return !!invalidatedToken
    }
}