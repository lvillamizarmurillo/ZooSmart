import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString} from 'class-validator';
export class storageAnimales {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro id es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro id debe ser un numero"}}})
    animal_id: number;
    @Expose({ name: 'nombre' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro nombre es obligatorio"}}})
    @IsString({message: ()=>{ throw {status: 422, message: `El nombre no cumple con el formato, debe ser string`}}})
    nombre: string;
    @Expose({ name: 'especie' })
    @IsDefined({message: ()=>{throw {status:422, message: "La especie es obligatorio"}}})
    @IsString({message: ()=>{ throw {status: 422, message: `La especie no cumple con el formato, debe ser string`}}})
    especie: string;
    @Expose({ name: 'edad' })
    @IsDefined({message: ()=>{throw {status:422, message: "La edad es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro edad debe ser un numero"}}})
    edad: number;


    constructor(animal_id: number, nombre: string, especie: string, edad:number) {
      this.animal_id = animal_id;
      this.nombre = nombre;
      this.especie = especie;
      this.edad = edad;
    }
}