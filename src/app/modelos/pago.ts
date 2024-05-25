export class Pago {
    
    run: string;
    nombreUsuario: string;
    apellidoUsuario: string;
    idPlan: string;
    nombrePlan: string;
    fechaPago: Date;
    monto: number;
    metodoPago: string;
    descuento: number;
  
    constructor(
      run: string,
      nombreUsuario: string,
      apellidoUsuario: string,
      idPlan: string,
      nombrePlan: string,
      fechaPago: Date,
      monto: number,
      metodoPago: string,
      descuento: number
    ) {
      this.run = run;
      this.nombreUsuario = nombreUsuario;
      this.apellidoUsuario = apellidoUsuario;
      this.idPlan = idPlan;
      this.nombrePlan = nombrePlan;
      this.fechaPago = fechaPago;
      this.monto = monto;
      this.metodoPago = metodoPago;
      this.descuento = descuento;
    }
  }
