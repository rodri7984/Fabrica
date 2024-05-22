export class Colaborador {
    username: string;
    password: string;
    nombre: string;
    apellido: string;
    rolColaborador: string;
    estado: string;

    constructor(
        username: string,
        password: string,
        nombre: string,
        apellido: string,
        rolColaborador: string,
        estado: string,
    ) {
        this.username = username;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rolColaborador = rolColaborador;
        this.estado = estado;
     }
}

