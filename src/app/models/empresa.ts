import { Telefono } from './telefono'
import { Correo } from './correo'

export class Empresa {
	public _id: string = undefined;
	public nombreComercial : string = '';
	public nombre : string = '';
	public provincia : string = '';
	public canton : string = '';
	public distrito : string = '';
	public barrio : string = '';
	public senas : string = '';
	public clienteAPI : string = '';
	public paginaWeb : string = '';
	public pieFactura : string = '';
	public logoName : string = '';
	public tipoId : string = '';
	public cedula : string = '';
	public telefonos : Telefono[] = [];
	public correo : Correo = new Correo();
	constructor(){
	}
}
