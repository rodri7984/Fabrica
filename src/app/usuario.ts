// usuario.ts
export class Usuario {
    runUser: number;
    digitoVUser: string;
    primerNombreUser: string;
    segundoNombreUser: string;
    paternoApellidoUser: string;
    maternoApellidoUser: string;
    correoElectronicoUser: string;
    telefonoUser: number;
    fechaNacimientoUser: string;
    tipoUser: string;
  
    constructor(
      runUser: number,
      digitoVUser: string,
      primerNombreUser: string,
      segundoNombreUser: string,
      paternoApellidoUser: string,
      maternoApellidoUser: string,
      correoElectronicoUser: string,
      telefonoUser: number,
      fechaNacimientoUser: string,
      tipoUser: string
    ) {
      this.runUser = runUser;
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