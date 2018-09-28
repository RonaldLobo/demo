import { Telefono } from './telefono'
import { Correo } from './correo'

export class Cliente {
	public _id: string = undefined;
	public nombre : string = '';
	public apellido1 : string = '';
	public apellido2 : string = '';
	public provincia : string = '1';
	public canton : string = '01';
	public distrito : string = '01';
	public tipoId : string = '01';
	public cedula : number = 0;
	public telefonos : Telefono[] = [];
	public correo : Correo = new Correo();
	constructor(){
	}
}
