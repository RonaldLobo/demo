import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

import * as Chart from 'chart.js'


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;
  cantBillMonth=[0,0,0,0,0,0,0,0,0,0,0,0];
  colorReport=[];

  constructor(private facturaService: FacturaService,public authService:AuthService, public router:Router) { }

  ngOnInit() {
    if(this.authService.isLogged == false){
      this.router.navigate(['/'])
    }
  }

  public obtenerCantidadFacturasMes(){   
    this.facturaService.getCountBillMonth().subscribe((data) => {         
         let temp = data.productBill;
         let numMayor=0;
         console.log(temp);
         temp.map(item => { 
              if (item.count > numMayor){
                numMayor = item.count;
              };
              return item;
         })
         console.log(numMayor);
         let mitad = numMayor / 2;
         temp.map(item => {
           this.cantBillMonth[item._id.month -1] = item.count; 
           if (item.count < mitad){
              this.colorReport[item._id.month -1] = 'rgba(255, 206, 86, 1)';
           }else{
              this.colorReport[item._id.month -1] = 'rgba(54, 162, 235, 1)';             
           }
           return item;
         })
         this.paintCantBillMonth();
      },(error)=>{
        console.log('error',error);
      });

  }




  ngAfterViewInit() {
    this.canvas = document.getElementById('CantBillMont');
    this.ctx = this.canvas.getContext('2d');
    this.obtenerCantidadFacturasMes()
    
  }


  paintCantBillMonth(){
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto","Setiembre","Octubre","Noviembre", "Diciembre"],
          datasets: [{
              label: 'Cantidad de Facturas por Mes',
              data:  this.cantBillMonth ,
              backgroundColor: this.colorReport,
              borderWidth: 1
          }]
      },
      options: {
        responsive: false
      }
    });
  }

 /* ngAfterViewInit() {
    this.canvas = document.getElementById('porMesporVendedor');
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["Luis", "Pedro", "Juan"],
          datasets: [{
              label: 'Ventas del mes por vendedor',
              data: [15,30,12],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false
      }
    });
  }*/

}

//cantidad de facturas facturadas
// ventas del mes por vendedor
