// usuario.ts
export class Usuario {
    run: string;
    digitoVUser: string;
    primerNombre: string;
    segundoNombre: string;
    paternoApellido: string;
    maternoApellido: string;
    email: string;
    fono: number | null;
    fechaNacimiento: string;
    tipoUsuario: string;

    
  
    constructor(
      run: string ,
      digitoVUser: string,
      primerNombre: string ,
      segundoNombre: string,
      paternoApellido: string,
      maternoApellido: string,
      email: string,
      fono: number | null,
      fechaNacimientoUser: string,
      tipoUser: string
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
      this.tipoUsuario = tipoUser;
    }
  }