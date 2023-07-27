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
import { IsDefined, IsNumber } from 'class-validator';
export class storageLikes {
    constructor(like_id, user_id, post_id) {
        this.like_id = like_id;
        this.user_id = user_id;
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
    Expose({ name: 'user-id' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro user-id es obligatorio" }; } }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro user-id debe ser un numero" }; } }),
    __metadata("design:type", Number)
], storageLikes.prototype, "user_id", void 0);
__decorate([
    Expose({ name: 'post-id' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro post-id es obligatorio" }; } }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro post-id debe ser un numero" }; } }),
    __metadata("design:type", Number)
], storageLikes.prototype, "post_id", void 0);
