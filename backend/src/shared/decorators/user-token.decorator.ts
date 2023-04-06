import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenDto } from '../interfaces/token.dto';

export const UserToken = createParamDecorator(
    (authParameter: string = 'authorization', ctx: ExecutionContext): TokenDto => {
        const request = ctx.switchToHttp().getRequest();
        const headerValue = request.headers[authParameter];
        const user = processUserToken(headerValue);
        return user;
    },
);

function processUserToken(headerValue: string): TokenDto {
    const token: TokenDto = <TokenDto>(
        JSON.parse(Buffer.from(headerValue.split('.')[1], 'base64').toString())
    );
    return token;
};