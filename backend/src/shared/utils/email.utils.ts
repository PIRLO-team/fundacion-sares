import { env } from "process";

export const emailCode = (first_name: string, last_name: string, createCode: number) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fundacion sares - Email</title>
  </head>
  <body>
    <h1>Fundación S.A.R.E.S.</h1>
    <p>Hola, ${first_name + ' ' + last_name}</p>
    <p>Este es tu código de verificación:</p>
    <h2>${createCode}</h2>
    <p>Gracias,</p>
    <p>El equipo de Fundación S.A.R.E.S.</p>
  </body>
</html>
`;

export const emailWelcome = (first_name: string, email: string, newUsername: string, password: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fundacion sares - Email</title>
  <link rel="stylesheet" href="https://pirlo.s3.us-west-1.amazonaws.com/Access/styles.css" />
</head>

<body>
  <main class="email">

    <div class="email__content">
      <h1 class="email__h1">Hola, <strong>${first_name}</strong></h1>
      <p>
        Te damos la bienvenida a la Fundación S.A.R.E.S. A continuación están las credenciales de acceso y los pasos para ingresar al aplicativo.
      </p>


      <p class="email__note">
        <strong>
          Nota: Recuerde que la contraseña es de un solo uso, al momento en que ingrese por primera vez, se le pedirá que la cambie.
        </strong>
      </p>

      <h2 class="email__h2">Credenciales de acceso</h2>

      <p><strong>Correo:</strong> <span>${email}</span></p>
      <p><strong>Usuario:</strong> <span>${newUsername}</span></p>
      <p><strong>Contraseña:</strong> <span>${password}</span></p>

      <h2 class="email__h2">Pasos para ingresar</h2>

      <p>
        1. Ingresa a la siguiente dirección:
        <a href="${env.FRONT_URL}">Link fundacion S.A.R.E.S</a>.
      </p>
      <p>
        2. Ingresa tu usuario y contraseña temporal que se encuentran en este
        correo.
      </p>
      <p>3. Ingresa la contraseña que deseas utilizar en el aplicativo.</p>
      <p>4. Listo, ya puedes iniciar sesión con tu nueva contraseña.</p>

      <p class="email__footer__text">
        Saludos, <br />
        El equipo de la Fundación S.A.R.E.S.
      </p>
    </div>
  </main>
</body>

</html>`;
