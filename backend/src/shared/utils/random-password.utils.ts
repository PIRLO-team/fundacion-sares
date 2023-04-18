import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordGeneratorService {
    generatePassword(length: number = 12): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const bytes = crypto.randomBytes(length);
        const password = Array.from(new Array(length), (_, i) => chars[bytes[i] % chars.length]).join('');
        return password;
    }
}
