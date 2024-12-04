import { SetMetadata } from "@nestjs/common";
import { IS_REDIRECTION_KEY } from "src/constants";

export const IsRedirection = () => SetMetadata(IS_REDIRECTION_KEY, true)