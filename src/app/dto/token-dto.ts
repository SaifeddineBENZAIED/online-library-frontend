import { ClientDto } from "./client-dto";
import { TokenType } from "./token-type";
import { UserDto } from "./user-dto";

export class TokenDto {
    id?: number;
    token?: string;
    tokenType?: TokenType;
    revoked?: boolean;
    expired?: boolean;
    user?: UserDto;
    client?: ClientDto;
}