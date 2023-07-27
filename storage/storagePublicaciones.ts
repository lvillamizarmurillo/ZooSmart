import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString} from 'class-validator';
export class storagePublicaciones {
    @Expose({ name: 'id' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro id es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro id debe ser un numero"}}})
    post_id: number;
    @Expose({ name: 'user-id' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro user-id es obligatorio"}}})
    @IsNumber({}, {message: ()=>{throw {status:406, message: "El formato del parametro user-id debe ser un numero"}}})
    user_id: number;
    @Expose({ name: 'titulo' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro titulo es obligatorio"}}})
    @IsString({message: ()=>{ throw {status: 422, message: `El titulo no cumple con el formato, debe ser string`}}})
    titulo: string;
    @Expose({ name: 'descripcion' })
    @IsDefined({message: ()=>{throw {status:422, message: "El parametro descripcion es obligatorio"}}})
    @IsString({message: ()=>{ throw {status: 422, message: `La descripcion no cumple con el formato, debe ser string`}}})
    descripcion: string;
    @Expose({ name: 'imagen-ruta' })
    @Transform(({ value }) => { if(/^[0-9]|[a-z A-Z]|[\S\s]|undefined+$/.test(value)) return (value) ? value : "Sin-Info" ; else throw {status: 406, message: "El formato del parametro imagen-ruta no es correcto"};}, { toClassOnly: true })
    imagen_ruta: string;


    constructor(post_id: number, user_id: number, titulo: string, descripcion: string, imagen_ruta: string) {
      this.post_id = post_id;
      this.user_id = user_id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.imagen_ruta = imagen_ruta;
    }
}