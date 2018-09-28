export class Producto {
	public _id: string = undefined;
	public nombre : string = '';
	public precio : number = 0;
	public descripcion : string = '';
	public marca : string = '';
	public codigo : string = '';
	public unidad : string = 'Und';
	public cantidad : number = 0;
	public descuento : number = 0;
	public descuento_tipo : number = 1;
	public categoria : number = 1;
	public estado : boolean = true;
	public impuestos : number = 0;
	public idSucursal : string = '';
	public ubicacion : string = '';
	public proveedor : string = '';
	public modelo : string = '';
	public utilidad : number = 0;
	public costo : number = 0;
	constructor(){
	}
}
