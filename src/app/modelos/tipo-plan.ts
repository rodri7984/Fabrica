export class TipoPlan {

    idTipoPlan: string;
    nombrePlan: string;
    valorPlan: number;
    fechaInicioPlan: Date;
    fechaPagoPlan: Date;

    constructor(
        idTipoPlan: string,
        nombrePlan: string,
        valorPlan: number,
        fechaInicioPlan: Date,
        fechaPagoPlan: Date
    ){
        this.idTipoPlan = idTipoPlan;
        this.nombrePlan = nombrePlan;
        this.valorPlan = valorPlan;
        this.fechaInicioPlan = fechaInicioPlan;
        this.fechaPagoPlan = fechaPagoPlan

    }


}
