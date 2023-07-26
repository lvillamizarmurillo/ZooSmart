import { Expose, Transform , Type} from 'class-transformer';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength, IsDate, IsEmail } from 'class-validator';
export class storageUsers {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro id es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro id debe ser un numero"}}})
    user_id: number;
    @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro nombre es obligatorio"}}})
    @IsString({message: ()=>{ throw {status: 422, message: `El nombre no cumple con el formato`}}})
    @Transform(({ value }) => { if(/^[a-z A-Z]+$/.test(value)) return value ; else throw {status: 422, message: `El datos nombre no puede llevar numeros o caracteres especiales`};}, { toClassOnly: true })
    nombre: string; 
    @Expose({ name: 'email' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro email es obligatorio"}}})
    @IsEmail({}, {message: ()=>{ throw {status: 422, message: `El email no cumple con el formato`}}})
    email: string;
    @Expose({ name: 'numero' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro numero es obligatorio"}}})    
    @Transform(({ value }) => { if(/^[0-9]|undefined+$/.test(value)) return value ; else throw {status: 400, message: "El formato debe ser en un string, debe colocar 10 numeros en ese formato"};}, { toClassOnly: true })
    @MinLength(10, {message : ()=> { throw {status: 411, message: `El numero debe ser de 10 caracteres`}}})
    @MaxLength(10, {message : ()=> { throw {status: 411, message: `El numero debe ser string, aparte solo puede poner 10 caracteres`}}})
    numero: number;
    @Expose({ name: 'password' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro password es obligatorio`}}})
    @MinLength(8, {message : ()=> { throw {status: 411, message: `El password debe ser mas de 8 caracteres, recuerse que sea string`}}})
    @MaxLength(12, {message : ()=> { throw {status: 411, message: `El password supero el limite :(`}}})
    @Type(() => String)
    password: string;



    constructor(user_id: number, nombre: string, email: string, numero: number, password: string) {
      this.user_id = user_id;
      this.nombre = nombre;
      this.email = email;
      this.numero = numero;
      this.password = password;
    }
}