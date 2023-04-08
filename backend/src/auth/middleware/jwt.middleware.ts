import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    async use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
            throw new HttpException(
                {
                    response: { valid: false },
                    title: '❌ Algo salió mal',
                    message: 'Token no valido. Por favor, inicia sesión nuevamente.',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            req['user'] = decoded;
            next();
        } catch (err) {
            throw new HttpException(
                {
                    response: { valid: false },
                    title: '❌ Algo salió mal',
                    message: 'La sesión ha expirado. Por favor, inicia sesión nuevamente.',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}