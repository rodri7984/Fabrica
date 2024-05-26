export class Plan

{
    idPlan: string;
    nombrePlan: string;
    valorPlan: number;
    mensualidades : number;
    descripcionPlan: string;



    constructor(

        idPlan: string ,
        nombrePlan: string,
        valorPlan: number,
        mensualidades : number,
        descripcionPlan: string,



    ){
        this.idPlan = idPlan;
        this.nombrePlan = nombrePlan;
        this.valorPlan = valorPlan;
        this.mensualidades = mensualidades;
        this.descripcionPlan = descripcionPlan;
        
    }
  }
