export class Usuario {

    static newFromFB({email, uid, nombre}): Usuario{
        return new Usuario(uid, nombre, email); 
    }
    constructor(public uid:string, public nombre:string, public email:string){}
}