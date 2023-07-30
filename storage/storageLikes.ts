import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsBoolean} from 'class-validator';
export class storageLikes {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro id es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro id debe ser un numero"}}})
    like_id: number;
    @Expose({ name: 'post-id' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro post-id es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro post-id debe ser un numero"}}})
    post_id: number;
    @Expose({ name: 'estado' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro estado es obligatorio"}}})
    @IsBoolean({message: ()=>{throw {status:406, message: "El formato del parametro estado debe ser un booleano('true','false')"}}})
    estado: boolean;


    constructor(like_id: number, post_id: number, estado:boolean) {
      this.like_id = like_id;
      this.estado = estado;
      this.post_id = post_id;
    }
}