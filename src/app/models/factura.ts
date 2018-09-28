import { Cliente } from './cliente';
import { Usuario } from './usuario';
import { Productofacturaitem } from './productofacturaitem'

export class Factura {
	public _id: string = undefined;
	public productos : Productofacturaitem[] = [];
	public comprador : Cliente = new Cliente();
	public vendedor : Usuario = new Usuario();
	public notas : string = '';
	public idSucursal : string = '';
	public tipo_de_pago : string = 'efectivo';
	public comprobante : string = '';
	public descuento : number = 0;
	public total : number = 0;
	public descuento_tipo : number = 1;
	public estado : string = 'pendiente';
	public consecutivo : string = '';
	public clave : string = '';
	public refresh : string = '';
	public fecha_modificada : Date = new Date();
	constructor(){
	}
}
