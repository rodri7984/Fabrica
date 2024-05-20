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
    fechaRegistro: Date;
    estado: string;
    idTipoPlan : string;
    descuento : number;

    
  
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
      estado: string,
      fechaRegistro: Date,
      idTipoPlan : string,
      descuento : number
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
      this.estado = estado;
      this.fechaRegistro = fechaRegistro;
      this.idTipoPlan = idTipoPlan;
      this.descuento = descuento;
    }
  }