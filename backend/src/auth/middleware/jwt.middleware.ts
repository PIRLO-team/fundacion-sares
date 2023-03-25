import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    async use(
        @Req() req: Request,
        @Res() res: Response,
        @Next() next: NextFunction
    ) {
        try {
            const token = req.headers.authorization;
            console.log("🚀 ~ file: jwt.middleware.ts:15 ~ JwtMiddleware ~ token:", token)
            const decoded = jwt.verify(token, env.JWT_SECRET);
            req['user'] = decoded;
            next();
        } catch (err) {
            throw new HttpException(
                {
                    response: {},
                    title: '❌ Algo salio mal',
                    message: 'Por favor inicia sesión nuevamente',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}
