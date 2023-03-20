import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from '../shared/handlers/error.utils';
import { AuthRepository } from './auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _handlerError: HandlersError,
  ) { }

  async logIn(LogInCredentialDto: LogInCredentialDto): Promise<any> {
    try {
      const email = LogInCredentialDto.email;
      const username = LogInCredentialDto.username;
      const password = LogInCredentialDto.password;

      if (!(email || username) || password) {
        return {
          message: 'Por favor ingrese todos los datos.',
          status: HttpStatus.BAD_REQUEST,
        }
      }

      
    } catch (error) {
      return this._handlerError.returnErrorRes({ error })
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
