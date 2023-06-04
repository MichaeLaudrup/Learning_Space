export class Transaccion{

    constructor( public descripcion:string,
                public cantidad: number,
                public tipo: string,
                public uid?: string){}
}