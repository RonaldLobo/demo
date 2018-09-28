import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DecimalPipe, DatePipe } from '@angular/common'

import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//Import del archivo que tiene las rutas, se debe agregar a los imports
import { AppRoutingModule } from './app.routes.module';

// Componentes que deben ser agregados a los declarations
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDisplayComponent } from './productos/producto-display/producto-display.component';
import { ProductoAgregarComponent } from './productos/producto-agregar/producto-agregar.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDisplayComponent } from './usuarios/usuario-display/usuario-display.component';
import { UsuarioAgregarComponent } from './usuarios/usuario-agregar/usuario-agregar.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { SucursalDisplayComponent } from './sucursales/sucursal-display/sucursal-display.component';
import { SucursalAgregarComponent } from './sucursales/sucursal-agregar/sucursal-agregar.component';

//servicios creados deben ser agregados en los providers 
import { ProductosService } from './services/productos.service';
import { UsuariosService } from './services/usuarios.service';
import { SucursalService } from './services/sucursal.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { TextContainsValidator } from './shared/text-contains.directive';
import { VentasComponent } from './ventas/ventas.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesService } from './services/clientes.service';
import { FacturaService } from './services/factura.service';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/authguard.service';
import { FacturadorService } from './services/facturador.service';
import { SharedService } from './services/shared.service';


import { ClienteAgregarComponent } from './clientes/cliente-agregar/cliente-agregar.component';
import { ClienteDisplayComponent } from './clientes/cliente-display/cliente-display.component';
import { FacturaDisplayComponent } from './facturas/factura-display/factura-display.component';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { VerFacturasComponent } from './ver-facturas/ver-facturas.component';

import { AprobacionesComponent } from './aprobaciones/aprobaciones.component';
import { AprobarComponent } from './aprobaciones/aprobar/aprobar.component';
import { AceptacionService } from './services/aceptacion.service';

import { NgxPaginationModule } from 'ngx-pagination';

import { OrderModule } from 'ngx-order-pipe';
import { InventarioComponent } from './inventario/inventario.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ProductoDisplayComponent,
    ProductoAgregarComponent,
    AboutComponent,
    NavComponent,
    HomeComponent,
    UsuariosComponent,
    UsuarioDisplayComponent,
    UsuarioAgregarComponent,
    TextContainsValidator,
    VentasComponent,
    FacturasComponent,
    ContabilidadComponent,
    RestauranteComponent,
    LeftNavComponent,
    ReportesComponent,
    ClientesComponent,
    ClienteAgregarComponent,
    ClienteDisplayComponent,
    FacturaDisplayComponent,
    VerFacturasComponent,
    SucursalesComponent,
    SucursalDisplayComponent,
    SucursalAgregarComponent,
    AprobacionesComponent,
    AprobarComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PerfectScrollbarModule,
    OrderModule,
    NgxPaginationModule
  ],
  providers: [
    ProductosService,
    UsuariosService,
    DataService,
    AuthService,
    ClientesService,
    FacturaService,
    SucursalService,
    LoginService,
    DecimalPipe,
    DatePipe,
    AuthGuardService,
    FacturadorService,
    AceptacionService,
    SharedService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
