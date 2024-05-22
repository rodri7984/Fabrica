export class Plan

{
    idPlan: string;
    nombrePlan: string;
    valorPlan: number;
    descripcionPlan: string;



    constructor(

        idPlan: string ,
        nombrePlan: string,
        valorPlan: number,
        descripcionPlan: string,



    ){
        this.idPlan = idPlan;
        this.nombrePlan = nombrePlan;
        this.valorPlan = valorPlan;
        this.descripcionPlan = descripcionPlan;
        
    }
  }
