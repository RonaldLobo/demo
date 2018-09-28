import { Producto } from './producto';

export class Productofacturaitem {
	public _id: string = undefined;
	public producto : Producto = new Producto();
	public descuento : number = 0;
	public descuento_tipo : number = 0;
	public cantidad : number = 0;
	public estado : boolean = true;
	constructor(){
	}
}
