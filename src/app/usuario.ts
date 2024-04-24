// usuario.ts
export class Usuario {
    run: string;
    digitoVUser: string;
    primerNombreUser: string;
    segundoNombreUser: string;
    paternoApellidoUser: string;
    maternoApellidoUser: string;
    correoElectronicoUser: string;
    telefonoUser: number | null;
    fechaNacimientoUser: string;
    tipoUser: string;
  
    constructor(
      run: string,
      digitoVUser: string,
      primerNombreUser: string,
      segundoNombreUser: string,
      paternoApellidoUser: string,
      maternoApellidoUser: string,
      correoElectronicoUser: string,
      telefonoUser: number | null,
      fechaNacimientoUser: string,
      tipoUser: string
    ) {
      this.run = run;
      this.digitoVUser = digitoVUser;
      this.primerNombreUser = primerNombreUser;
      this.segundoNombreUser = segundoNombreUser;
      this.paternoApellidoUser = paternoApellidoUser;
      this.maternoApellidoUser = maternoApellidoUser;
      this.correoElectronicoUser = correoElectronicoUser;
      this.telefonoUser = telefonoUser;
      this.fechaNacimientoUser = fechaNacimientoUser;
      this.tipoUser = tipoUser;
    }
  }