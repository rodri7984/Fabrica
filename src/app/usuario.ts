// usuario.ts
import { RolUsuario } from "./modelos/rol-usuario";

export class Usuario {
    run: string;
    digitoVUser: string;
    primerNombre: string;
    segundoNombre: string;
    paternoApellido: string;
    maternoApellido: string;
    email: string;
    fono: number | null;
    fechaNacimiento: Date;
    rolUsuario: string;
    fechaRegistro: Date;
    estado: string;
    descuento: number | null;
    
    constructor(
      run: string ,
      digitoVUser: string,
      primerNombre: string ,
      segundoNombre: string,
      paternoApellido: string,
      maternoApellido: string,
      email: string,
      fono: number | null,
      fechaNacimientoUser: Date,
      rolUsuario: string,
      estado: string,
      fechaRegistro: Date,
      descuento: number | null
    ) {
      this.run = run;
      this.digitoVUser = digitoVUser;
      this.primerNombre = primerNombre;
      this.segundoNombre = segundoNombre;
      this.paternoApellido = paternoApellido;
      this.maternoApellido = maternoApellido;
      this.email = email;
      this.fono = fono;
      this.fechaNacimiento = fechaNacimientoUser;
      this.rolUsuario = rolUsuario;
      this.estado = estado;
      this.fechaRegistro = fechaRegistro;
      this.descuento = descuento;
    }
  }