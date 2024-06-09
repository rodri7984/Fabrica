export class Plan

{
    idPlan: string;
    nombrePlan: string;
    valorPlan: number;
    estado : string;
    descripcionPlan: string;



    constructor(

        idPlan: string ,
        nombrePlan: string,
        valorPlan: number,
        estado : string,
        descripcionPlan: string,



    ){
        this.idPlan = idPlan;
        this.nombrePlan = nombrePlan;
        this.valorPlan = valorPlan;
        this.estado = estado;
        this.descripcionPlan = descripcionPlan;
        
    }
  }
