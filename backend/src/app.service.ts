import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello World! Bienvenido a la API para el manejo del inventario de los insumos de los botiquines, y el ingreso de gastos de insumos de botiquines en eventos de la <b>Fundación S.A.R.E.S.</b></h1>';
  }
}
