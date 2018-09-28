import { Component, OnInit, Input, Output,EventEmitter, TemplateRef } from '@angular/core';
import { Productofacturaitem } from '../../models/productofacturaitem';
import { Producto } from '../../models/producto';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-factura-display',
  templateUrl: './factura-display.component.html',
  styleUrls: ['./factura-display.component.css']
})
export class FacturaDisplayComponent implements OnInit {


  @Input() productofacturaitem : Productofacturaitem;
  @Input() copy : Producto;
  @Input() index : number;
  @Input() estado : string;
	@Output() borrarProd = new EventEmitter<number>();
	@Output() editarFactura = new EventEmitter<any>();
	@Output() actualizarLista = new EventEmitter<any>();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    //this.copy = JSON.parse(JSON.stringify(this.productofacturaitem.producto));
  }

  borrar(){
    console.log('borrar');
    this.borrarProd.emit(this.index);
  }

  fueraDescuento(){
    if(this.productofacturaitem.descuento == null || isNaN(this.productofacturaitem.descuento)){
      this.productofacturaitem.descuento = 0;
    } else if(this.productofacturaitem.descuento > 99 && this.productofacturaitem.descuento_tipo == 2){
      this.productofacturaitem.descuento = 0;
      alert('Cambie el monto de descuento si quiere usar porcentajes.');
    } else if(this.productofacturaitem.descuento > this.productofacturaitem.producto.precio && this.productofacturaitem.descuento_tipo == 1){
      this.productofacturaitem.descuento = 0;
      alert('No puede poner un descuento mayor al precio del producto.');
    } else if(this.productofacturaitem.descuento < 0){
      this.productofacturaitem.descuento = 0;
      alert('El descuento no puede ser menor a 0.');
    } else {
      this.editarFactura.emit();
    }
  }

  fueraDescuentoTipo(){
    if(this.productofacturaitem.descuento > 99 && this.productofacturaitem.descuento_tipo == 2){
      this.productofacturaitem.descuento_tipo = 1;
      alert('Cambie el monto de descuento si quiere usar porcentajes. 2');
    } else if(this.productofacturaitem.descuento > this.productofacturaitem.producto.precio && this.productofacturaitem.descuento_tipo == 1){
      this.productofacturaitem.descuento_tipo = 2;
      alert('No puede poner un descuento mayor al precio del producto.');
    } else {
      this.editarFactura.emit();
    }
  }

  fueraCantidad(){
    if(this.productofacturaitem.cantidad == null || isNaN(this.productofacturaitem.cantidad)){
      this.productofacturaitem.cantidad = 1;
    } else if(this.productofacturaitem.cantidad > this.productofacturaitem.producto.cantidad){
      this.productofacturaitem.cantidad = 1;
      alert('No puede poner una cantidad mayor a la disponible: '+this.productofacturaitem.producto.cantidad+'.');
    } else if(this.productofacturaitem.cantidad < 1){
      this.productofacturaitem.cantidad = 1;
      alert('La cantidad no puede ser menor a 1.');
    } else {
      this.editarFactura.emit();
    }
  }

  fueraPrecio(){
    if(this.productofacturaitem.producto.precio == null || isNaN(this.productofacturaitem.producto.precio)){
      this.productofacturaitem.producto.precio = 1;
      alert('El precio no debe ser un número.');
    } else if(this.productofacturaitem.producto.precio < 1){
      this.productofacturaitem.producto.precio = 1;
      alert('El precio no puede ser menor a 1.');
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ver(template: TemplateRef<any>){
    this.copy = JSON.parse(JSON.stringify(this.productofacturaitem.producto));
    this.openModal(template);
  }

}
