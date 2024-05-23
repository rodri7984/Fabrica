export class PlanUsuario {
    run: string;
    idPlan: string;
    nombrePlan: string;
    nombreUsuario: string;
    apellidoUsuario: string;
    fechaRegistroPlan: Date;
    fechaInicio: Date;
    fechaFin: Date;
    monto: number;
    metodoPago: string;
    descuento: number;


    constructor(
        run: string ,
        idPlan: string,
        nombrePlan: string ,
        nombreUsuario: string,
        apellidoUsuario: string,
        fechaRegistroPlan: Date,
        fechaInicio: Date,
        fechaFin: Date,
        monto: number,
        metodoPago: string,
        descuento: number,
  
      ) {
        this.run = run;
        this.idPlan = idPlan;
        this.nombrePlan = nombrePlan;
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.fechaRegistroPlan = fechaRegistroPlan;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.descuento = descuento;
  
      }
    }
  
