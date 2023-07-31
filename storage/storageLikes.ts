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

    constructor(like_id: number, post_id: number) {
      this.like_id = like_id;
      this.post_id = post_id;
    }
}