var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsBoolean } from 'class-validator';
export class storageLikes {
    constructor(like_id, post_id, estado) {
        this.like_id = like_id;
        this.estado = estado;
        this.post_id = post_id;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro id es obligatorio" }; } }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro id debe ser un numero" }; } }),
    __metadata("design:type", Number)
], storageLikes.prototype, "like_id", void 0);
__decorate([
    Expose({ name: 'post-id' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro post-id es obligatorio" }; } }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro post-id debe ser un numero" }; } }),
    __metadata("design:type", Number)
], storageLikes.prototype, "post_id", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro estado es obligatorio" }; } }),
    IsBoolean({ message: () => { throw { status: 406, message: "El formato del parametro estado debe ser un booleano('true','false')" }; } }),
    __metadata("design:type", Boolean)
], storageLikes.prototype, "estado", void 0);
