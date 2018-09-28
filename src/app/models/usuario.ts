import { Telefono } from './telefono'
import { Correo } from './correo'

export class Usuario {
	public _id: string = undefined;
	public nombre : string = '';
	public idSucursal : string = '';
	public apellido1 : string = '';
	public apellido2 : string = '';
	public clave : string = '';
	public cedula : number = 0;
	public rol : number = 1;
	public telefonos : Telefono[] = [];
	public correo : Correo = new Correo();
	constructor(){
	}
}
