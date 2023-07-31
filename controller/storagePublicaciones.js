var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';
export class storagePublicaciones {
    constructor(post_id, user_id, titulo, descripcion, imagen_ruta, animal_id) {
        this.post_id = post_id;
        this.user_id = user_id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen_ruta = imagen_ruta;
        this.animal_id = animal_id;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro id es obligatorio" }; } }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro id debe ser un numero" }; } }),
    __metadata("design:type", Number)
], storagePublicaciones.prototype, "post_id", void 0);
__decorate([
    Expose({ name: 'user-id' }),
    Transform(({ value }) => { if (/^[0-9]|undefined+$/.test(value))
        return (value);
    else
        throw { status: 422, message: "El formato del parametro user-id debe ser un numero." }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], storagePublicaciones.prototype, "user_id", void 0);
__decorate([
    Expose({ name: 'titulo' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro titulo es obligatorio" }; } }),
    IsString({ message: () => { throw { status: 422, message: `El titulo no cumple con el formato, debe ser string` }; } }),
    __metadata("design:type", String)
], storagePublicaciones.prototype, "titulo", void 0);
__decorate([
    Expose({ name: 'descripcion' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro descripcion es obligatorio" }; } }),
    IsString({ message: () => { throw { status: 422, message: `La descripcion no cumple con el formato, debe ser string` }; } }),
    __metadata("design:type", String)
], storagePublicaciones.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: 'imagen-ruta' }),
    Transform(({ value }) => { if (/^[0-9]|[a-z A-Z]|[\S\s]|undefined+$/.test(value))
        return (value) ? value : "Sin-Info";
    else
        throw { status: 406, message: "El formato del parametro imagen-ruta no es correcto" }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], storagePublicaciones.prototype, "imagen_ruta", void 0);
__decorate([
    Expose({ name: 'animal-id' }),
    Transform(({ value }) => { if (/^[0-9]|undefined+$/.test(value))
        return (value);
    else
        throw { status: 422, message: "El formato del parametro animal-id debe ser un numero." }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], storagePublicaciones.prototype, "animal_id", void 0);
