import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptPasswordEncoder {
    public matches(hashedPassword: string, incomingPassword: string): boolean {
        try {
            return bcrypt.compareSync(incomingPassword, hashedPassword);
        } catch (error) {
            console.log("🚀 ~ file: bcrypt.utils.ts:10 ~ BcryptPasswordEncoder ~ matches ~ error:", error)
            return false;
        }
    }

    public encode(incomingPassword: string): string {
        const salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(incomingPassword, salt);
    }
}
