var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform, Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
export class storageUsers {
    constructor(user_id, nombre, email, numero, password) {
        this.user_id = user_id;
        this.nombre = nombre;
        this.email = email;
        this.numero = numero;
        this.password = password;
    }
}
__decorate([
    Expose({ name: 'id' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro id es obligatorio" }; } }),
    IsNumber({}, { message: () => { throw { status: 406, message: "El formato del parametro id debe ser un numero" }; } }),
    __metadata("design:type", Number)
], storageUsers.prototype, "user_id", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro nombre es obligatorio" }; } }),
    IsString({ message: () => { throw { status: 422, message: `El nombre no cumple con el formato` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z]+$/.test(value))
        return value;
    else
        throw { status: 422, message: `El datos nombre no puede llevar numeros o caracteres especiales` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], storageUsers.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro email es obligatorio" }; } }),
    IsEmail({}, { message: () => { throw { status: 422, message: `El email no cumple con el formato` }; } }),
    __metadata("design:type", String)
], storageUsers.prototype, "email", void 0);
__decorate([
    Expose({ name: 'numero' }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro numero es obligatorio" }; } }),
    Transform(({ value }) => { if (/^[0-9]|undefined+$/.test(value))
        return value;
    else
        throw { status: 400, message: "El formato debe ser en un string, debe colocar 10 numeros en ese formato" }; }, { toClassOnly: true }),
    MinLength(10, { message: () => { throw { status: 411, message: `El numero debe ser de 10 caracteres` }; } }),
    MaxLength(10, { message: () => { throw { status: 411, message: `El numero debe ser string, aparte solo puede poner 10 caracteres` }; } }),
    __metadata("design:type", Number)
], storageUsers.prototype, "numero", void 0);
__decorate([
    Expose({ name: 'password' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro password es obligatorio` }; } }),
    MinLength(8, { message: () => { throw { status: 411, message: `El password debe ser mas de 8 caracteres, recuerse que sea string` }; } }),
    MaxLength(12, { message: () => { throw { status: 411, message: `El password supero el limite :(` }; } }),
    Type(() => String),
    __metadata("design:type", String)
], storageUsers.prototype, "password", void 0);
