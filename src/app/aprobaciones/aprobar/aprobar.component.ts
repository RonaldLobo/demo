import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgModel, DefaultValueAccessor, NgControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Parser } from 'xml2js';
import { AuthService } from '../../services/auth.service';
import { FacturadorService } from '../../services/facturador.service';
import { AceptacionService } from '../../services/aceptacion.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Aceptacion } from '../../models/aceptacion';
import { ActivatedRoute, Router } from '@angular/router'; 


@Component({
	selector: 'app-aprobar',
	templateUrl: './aprobar.component.html',
	styleUrls: ['./aprobar.component.css']
})
export class AprobarComponent implements OnInit {

	public procesando : boolean = false;
	public enviandoMH : boolean = false;
	private sub: any;
	public id : string = '';
	public aceptacion: Aceptacion = new Aceptacion();
	modalRefCompletar: BsModalRef;
	public aprobacion : any = {
		datos : {},
		cliente: {}
	};
	constructor(private aceptacionService:AceptacionService,
		private authService:AuthService,
		private facturadorService:FacturadorService, 
		private modalService: BsModalService,
		private route: ActivatedRoute) { 
		this.sub = this.route.params.subscribe(params => {
	       this.id = params['id'];
	       console.log(this.id);
	       if(this.id != undefined){
		       this.aceptacionService.obtenerAceptacionId(this.id).subscribe((data) => {
					console.log(data);
					this.aceptacion = data.acceptacion;
					Object.assign(this.aprobacion.datos,data.acceptacion);
				}, fail => {
				});
		    }
	    });
	}

	ngOnInit() {
	}

	updated($event) {
		var that = this;
		const files = $event.target.files || $event.srcElement.files;
		const file = files[0];
		const formData = new FormData();
		formData.append('file', file);
		var selectedFile = file;
		var readXml;
		var reader = new FileReader();
		reader.onload=function(e:any) {
			readXml=e.target.result;
			var parser = new Parser();
			var s = new XMLSerializer();
			parser.parseString(readXml,function (err, result) {
				that.aprobacion.datos.tipo = 'CCE';
				that.aprobacion.datos.mensaje = '1';
				that.aprobacion.datos.detalle_mensaje = 'Aceptada';
				that.aprobacion.datos.clave = result.FacturaElectronica.Clave[0];
				that.aprobacion.datos.fecha_emision_doc = result.FacturaElectronica.FechaEmision[0];

				that.aprobacion.datos.tipo_cedula_emisor = result.FacturaElectronica.Emisor[0].Identificacion[0].Tipo[0];
				that.aprobacion.datos.numero_cedula_emisor = result.FacturaElectronica.Emisor[0].Identificacion[0].Numero[0];
				that.aprobacion.datos.tipo_cedula_receptor = result.FacturaElectronica.Receptor[0].Identificacion[0].Tipo[0];
				that.aprobacion.datos.numero_cedula_receptor = result.FacturaElectronica.Receptor[0].Identificacion[0].Numero[0];
				that.aprobacion.datos.monto_total_impuesto = result.FacturaElectronica.ResumenFactura[0].TotalImpuesto[0];
				that.aprobacion.datos.total_factura = result.FacturaElectronica.ResumenFactura[0].TotalComprobante[0];
				that.aprobacion.cliente = {
					id: that.authService.loggedEmpresa.clienteAPI
				}
				console.log(that.aprobacion);
			});
		}
		reader.readAsText(selectedFile);
	}

	openModalCompletar(template: TemplateRef<any>) {
		this.modalRefCompletar = this.modalService.show(template);
	}

	enviarMH(status,template){
		var that = this;
		that.aprobacion.datos.tipo = status;
		switch (status) {
			case "CCE":
				that.aprobacion.datos.mensaje = '1';
				break;
			case "CPCE":
				that.aprobacion.datos.mensaje = '2';
				break;
			case "RCE":
				that.aprobacion.datos.mensaje = '3';
				break;
		}
		that.openModalCompletar(template);
		that.enviandoMH = true;
		Object.assign(that.aceptacion,that.aprobacion.datos);
		that.aceptacion.cliente = that.authService.loggedEmpresa.clienteAPI;
		that.facturadorService.post('/aprobar/',that.aprobacion)
		.then(res => {
			console.log('res',res);
			if(res.error == 'recibido'){
				that.aceptacion.estado = 'enviada';
				that.aceptacion.refresh = res.refreshToken;
				alert('Su solicitud fue enviada, pero el Ministerio de Hacienda está tardando mucho en responder, por favor intentelo de nuevo.')
				that.aceptacionService.agregarAceptacion(that.aceptacion)
				.then(resp => {
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				}, error => { 
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				});
			} if(res.respuesta == 'error' || res.estado == 'error en hacienda'){
				alert('Su solicitud fue enviada, pero el Ministerio de Hacienda parece estar teniendo problemas, por favor intentelo de nuevo mas tarde.')
			} else {
				that.aceptacion.estado = 'completada';
				that.aceptacionService.agregarAceptacion(that.aceptacion)
				.then(resp => {
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				}, error => { 
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				});
			}
			
		}, err =>{
			console.log('error',err);
			that.enviandoMH = false;
			that.modalRefCompletar.hide();
		})
	}

	reenviarMH(template){
		var that = this;
		that.openModalCompletar(template);
		that.enviandoMH = true;
		var data:any = that.aceptacion;
		data.revisar = true;
		that.facturadorService.post('/aprobar/',{datos:data,cliente:{id:that.authService.loggedEmpresa.clienteAPI}})
		.then(res => {
			if(res.error == 'recibido'){
				that.aceptacion.estado = 'enviada';
				that.aceptacion.refresh = res.refreshToken;
				alert('Su solicitud fue enviada, pero el Ministerio de Hacienda está tardando mucho en responder, por favor intentelo de nuevo.')
				that.aceptacionService.editarAceptacion(that.aceptacion)
				.then(resp => {
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				}, error => { 
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				});
			} if(res.respuesta == 'error' || res.estado == 'error en hacienda'){
				alert('Su solicitud fue enviada, pero el Ministerio de Hacienda parece estar teniendo problemas, por favor intentelo de nuevo.')
			} else {
				that.aceptacion.estado = 'completada';
				that.aceptacionService.editarAceptacion(that.aceptacion)
				.then(resp => {
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				}, error => { 
					that.enviandoMH = false;
					that.modalRefCompletar.hide();
				});
			}
		}, err =>{
			console.log('error',err);
			that.enviandoMH = false;
			that.modalRefCompletar.hide();
		})
	}

}
