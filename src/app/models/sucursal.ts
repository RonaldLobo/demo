import { Telefono } from './telefono'
import { Correo } from './correo'

export class Sucursal {
	public _id: string = undefined;
	public idEmpresa : string = '';
	public nombre : string = '';
	public provincia : string = '';
	public canton : string = '';
	public distrito : string = '';
	public senas : string = '';
	public telefonos : Telefono[] = [];
	public correo : Correo = new Correo();
	constructor(){
	}
}
