import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetCodeSnippet {
    public randomCode(): any {
        const code: number = Math.floor(Math.random() * 10000);
        const randomFourDigitNum: string = ('000' + code).slice(-4);
        return randomFourDigitNum;
    }
}