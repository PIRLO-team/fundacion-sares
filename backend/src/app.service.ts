import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Bienvenida a la API de Fundación S.A.R.E.S.</title>
      </head>
      <body>
        <h1>Hello World!</h1>
        <p>Bienvenido a la API para el manejo del inventario de los insumos de los botiquines, y el ingreso de gastos de insumos de botiquines en eventos de la Fundación S.A.R.E.S.</p>
      </body>
    </html>    
    `;
    
  }
}
