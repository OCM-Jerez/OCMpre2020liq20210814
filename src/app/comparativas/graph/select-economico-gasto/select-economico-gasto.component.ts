import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataGraphGastosService } from '../../../services/data-graph-gastos.service';
import economicos from '../../../../assets/data/Economicos2022.json';

@Component({
  selector: 'app-select-economico-gasto',
  templateUrl: './select-economico-gasto.component.html',
  styleUrls: ['./select-economico-gasto.component.scss']
})
export class SelectEconomicoGastoComponent {
  constructor(
    private router: Router,
    private dataGraphGastosService: DataGraphGastosService
  ) { }

  ecoArray: { CodEco: number, DesEco: string }[] = []
  // ecoArray =
  //   [
  //     {
  //       "CodEco": 10000,
  //       "DesEco": "Retribuciones básicas y otras remuneraciones"
  //     },
  //     {
  //       "CodEco": 10001,
  //       "DesEco": "Otras remuneraciones"
  //     },
  //     {
  //       "CodEco": 11000,
  //       "DesEco": "Retribuciones básicas personal eventual-Grupos Políticos"
  //     },
  //     {
  //       "CodEco": 11001,
  //       "DesEco": "Retribuciones complementarias-Grupos Políticos"
  //     },
  //     {
  //       "CodEco": 11002,
  //       "DesEco": "Otras remuneraciones personal eventual-Grupos Políticos"
  //     },
  //     {
  //       "CodEco": 12000,
  //       "DesEco": "Sueldos del grupo A1 personal funcionario"
  //     },
  //     {
  //       "CodEco": 12001,
  //       "DesEco": "Sueldos del grupo A2 personal funcionario"
  //     },
  //     {
  //       "CodEco": 12003,
  //       "DesEco": "Sueldos del Grupo C1"
  //     },
  //     {
  //       "CodEco": 12004,
  //       "DesEco": "Sueldos del grupo C2 personal funcionario"
  //     },
  //     {
  //       "CodEco": 12005,
  //       "DesEco": "Sueldos del Grupo E"
  //     },
  //     {
  //       "CodEco": 12006,
  //       "DesEco": "Trienios personal funcionario"
  //     },
  //     {
  //       "CodEco": 12100,
  //       "DesEco": "Complemento destino personal funcionario"
  //     },
  //     {
  //       "CodEco": 12101,
  //       "DesEco": "Complemento específico personal funcionario"
  //     },
  //     {
  //       "CodEco": 12103,
  //       "DesEco": "Otros complementos personal funcionario"
  //     },
  //     {
  //       "CodEco": 12200,
  //       "DesEco": "Retribuciones en especie"
  //     },
  //     {
  //       "CodEco": 13000,
  //       "DesEco": "Retribuciones básicas personal laboral fijo"
  //     },
  //     {
  //       "CodEco": 13001,
  //       "DesEco": "Horas extraordinarias personal laboral fijo"
  //     },
  //     {
  //       "CodEco": 13002,
  //       "DesEco": "Otras remuneraciones personal laboral fijo"
  //     },
  //     {
  //       "CodEco": 13100,
  //       "DesEco": "Retribuciones personal laboral eventual"
  //     },
  //     {
  //       "CodEco": 13101,
  //       "DesEco": "Indefinidos no fijos en plantilla"
  //     },
  //     {
  //       "CodEco": 13102,
  //       "DesEco": "Indemnizaciones ERE"
  //     },
  //     {
  //       "CodEco": 14300,
  //       "DesEco": "Retribuciones otro personal"
  //     },
  //     {
  //       "CodEco": 15000,
  //       "DesEco": "Productividad"
  //     },
  //     {
  //       "CodEco": 15002,
  //       "DesEco": "Productividad no disponible-Ser Grles"
  //     },
  //     {
  //       "CodEco": 15100,
  //       "DesEco": "Gratificaciones"
  //     },
  //     {
  //       "CodEco": 16000,
  //       "DesEco": "Seguridad Social"
  //     },
  //     {
  //       "CodEco": 16009,
  //       "DesEco": "Otras cuotas- Políticas activas empleo"
  //     },
  //     {
  //       "CodEco": 16200,
  //       "DesEco": "Formación y perfeccionamiento del personal"
  //     },
  //     {
  //       "CodEco": 16204,
  //       "DesEco": "Acción social"
  //     },
  //     {
  //       "CodEco": 16205,
  //       "DesEco": "Seguros-Otras prestaciones económicas a favor de empleados"
  //     },
  //     {
  //       "CodEco": 20200,
  //       "DesEco": "Arrendamientos edificios y otras construcciones"
  //     },
  //     {
  //       "CodEco": 20300,
  //       "DesEco": "Arrendamiento de maquinaria, instalaciones y utillaje"
  //     },
  //     {
  //       "CodEco": 20400,
  //       "DesEco": "Arrendamiento material transporte"
  //     },
  //     {
  //       "CodEco": 20500,
  //       "DesEco": "Arrendamientos de mobiliario y enseres"
  //     },
  //     {
  //       "CodEco": 20600,
  //       "DesEco": "Arrendamientos de equipos para proceso de informacion"
  //     },
  //     {
  //       "CodEco": 20800,
  //       "DesEco": "Arrendamiento otro inmovilizado material"
  //     },
  //     {
  //       "CodEco": 20900,
  //       "DesEco": "Cánones"
  //     },
  //     {
  //       "CodEco": 21000,
  //       "DesEco": "Reparación, mantenimiento y conservación infraestructura y bienes naturales"
  //     },
  //     {
  //       "CodEco": 21001,
  //       "DesEco": "Canalizaciones vía pública"
  //     },
  //     {
  //       "CodEco": 21200,
  //       "DesEco": "Reparación, mantenimiento y conservación edificios y otras construcciones"
  //     },
  //     {
  //       "CodEco": 21204,
  //       "DesEco": "Actuaciones inmediatas"
  //     },
  //     {
  //       "CodEco": 21206,
  //       "DesEco": "Reparación, mantenimiento y conservación elevadores"
  //     },
  //     {
  //       "CodEco": 21207,
  //       "DesEco": "Mantenimiento extintores"
  //     },
  //     {
  //       "CodEco": 21208,
  //       "DesEco": "Mantenimiento alarmas"
  //     },
  //     {
  //       "CodEco": 21300,
  //       "DesEco": "Reparación, mantenimiento y conservación maquinaria, instalaciones y utillaje"
  //     },
  //     {
  //       "CodEco": 21302,
  //       "DesEco": "Reparación, mantenimiento y conservación aparatos aire acondicionado"
  //     },
  //     {
  //       "CodEco": 21303,
  //       "DesEco": "Reparación, mantenimiento y conservación emisoras radio"
  //     },
  //     {
  //       "CodEco": 21400,
  //       "DesEco": "Reparación, mantenimiento y conservación elementos transporte"
  //     },
  //     {
  //       "CodEco": 21500,
  //       "DesEco": "Reparación, mantenimiento y conservación mobiliario y enseres"
  //     },
  //     {
  //       "CodEco": 21600,
  //       "DesEco": "Reparación, mantenimiento y conservación equipos proceso informático"
  //     },
  //     {
  //       "CodEco": 21700,
  //       "DesEco": "Reparación mantenimiento y conservación instrumentos municipales"
  //     },
  //     {
  //       "CodEco": 21900,
  //       "DesEco": "Reparación, mantenimiento y conservación otro inmovilizado material"
  //     },
  //     {
  //       "CodEco": 22000,
  //       "DesEco": "Ordinario no inventariable"
  //     },
  //     {
  //       "CodEco": 22001,
  //       "DesEco": "Prensa, revistas, libros y otras publicaciones"
  //     },
  //     {
  //       "CodEco": 22002,
  //       "DesEco": "Material informático no inventariable"
  //     },
  //     {
  //       "CodEco": 22003,
  //       "DesEco": "Ordinario no inventariable para almacen"
  //     },
  //     {
  //       "CodEco": 22100,
  //       "DesEco": "Energía eléctrica"
  //     },
  //     {
  //       "CodEco": 22101,
  //       "DesEco": "Agua"
  //     },
  //     {
  //       "CodEco": 22102,
  //       "DesEco": "Suministro de gas"
  //     },
  //     {
  //       "CodEco": 22103,
  //       "DesEco": "Combustibles y carburantes"
  //     },
  //     {
  //       "CodEco": 22104,
  //       "DesEco": "Suministro de vestuario."
  //     },
  //     {
  //       "CodEco": 22105,
  //       "DesEco": "Productos alimenticios"
  //     },
  //     {
  //       "CodEco": 22106,
  //       "DesEco": "Productos farmaceuticos y material sanitario"
  //     },
  //     {
  //       "CodEco": 22107,
  //       "DesEco": "Gestion ayudas sociales especie"
  //     },
  //     {
  //       "CodEco": 22108,
  //       "DesEco": "Suminist otro material para almacen central"
  //     },
  //     {
  //       "CodEco": 22109,
  //       "DesEco": "Suministro munición"
  //     },
  //     {
  //       "CodEco": 22110,
  //       "DesEco": "Productos de limpieza y aseo"
  //     },
  //     {
  //       "CodEco": 22111,
  //       "DesEco": "Suministro repuestos maquinaria, utillaje y elementos"
  //     },
  //     {
  //       "CodEco": 22112,
  //       "DesEco": "Suministro material electrónico, eléctrico y telecomunicaciones"
  //     },
  //     {
  //       "CodEco": 22113,
  //       "DesEco": "Manutención de animales"
  //     },
  //     {
  //       "CodEco": 22199,
  //       "DesEco": "Otros suministros"
  //     },
  //     {
  //       "CodEco": 22200,
  //       "DesEco": "Postales"
  //     },
  //     {
  //       "CodEco": 22201,
  //       "DesEco": "Postales otras"
  //     },
  //     {
  //       "CodEco": 22202,
  //       "DesEco": "Telegráficas"
  //     },
  //     {
  //       "CodEco": 22203,
  //       "DesEco": "Informáticas"
  //     },
  //     {
  //       "CodEco": 22299,
  //       "DesEco": "Otros gastos en comunicaciones"
  //     },
  //     {
  //       "CodEco": 22300,
  //       "DesEco": "Transportes de mercancías"
  //     },
  //     {
  //       "CodEco": 22400,
  //       "DesEco": "Primas de seguro"
  //     },
  //     {
  //       "CodEco": 22401,
  //       "DesEco": "Seguros voluntario PC"
  //     },
  //     {
  //       "CodEco": 22500,
  //       "DesEco": "Tributos Estatales"
  //     },
  //     {
  //       "CodEco": 22501,
  //       "DesEco": "Tributos Comunidades Autónomas"
  //     },
  //     {
  //       "CodEco": 22502,
  //       "DesEco": "Tributos Entidades locales"
  //     },
  //     {
  //       "CodEco": 22601,
  //       "DesEco": "Atenciones protocolarias y representativas"
  //     },
  //     {
  //       "CodEco": 22602,
  //       "DesEco": "Publicidad y propaganda"
  //     },
  //     {
  //       "CodEco": 22603,
  //       "DesEco": "Publicación en Diarios Oficiales"
  //     },
  //     {
  //       "CodEco": 22604,
  //       "DesEco": "Jurídicos, contenciosos"
  //     },
  //     {
  //       "CodEco": 22606,
  //       "DesEco": "Reuniones, conferencias y cursos"
  //     },
  //     {
  //       "CodEco": 22607,
  //       "DesEco": "Oposiciones y pruebas selectivas"
  //     },
  //     {
  //       "CodEco": 22608,
  //       "DesEco": "Comunidad de propietarios"
  //     },
  //     {
  //       "CodEco": 22609,
  //       "DesEco": "Actividades culturales y deportivas"
  //     },
  //     {
  //       "CodEco": 22610,
  //       "DesEco": "Festejos populares"
  //     },
  //     {
  //       "CodEco": 22611,
  //       "DesEco": "Indemnizaciones"
  //     },
  //     {
  //       "CodEco": 22612,
  //       "DesEco": "Actividades culturales en barriadas rurales"
  //     },
  //     {
  //       "CodEco": 22613,
  //       "DesEco": "Club Amigos del Zoo"
  //     },
  //     {
  //       "CodEco": 22614,
  //       "DesEco": "Otros gastos de promoción"
  //     },
  //     {
  //       "CodEco": 22616,
  //       "DesEco": "Publicidad, propaganda a cargo particulares"
  //     },
  //     {
  //       "CodEco": 22623,
  //       "DesEco": "Actividades complementarias"
  //     },
  //     {
  //       "CodEco": 22625,
  //       "DesEco": "Actividades de juventud"
  //     },
  //     {
  //       "CodEco": 22626,
  //       "DesEco": "Dinamización del ocio juvenil"
  //     },
  //     {
  //       "CodEco": 22630,
  //       "DesEco": "Actividades menores p. Infanc Fam."
  //     },
  //     {
  //       "CodEco": 22633,
  //       "DesEco": "Actividades programa prevención mendicidad infantil"
  //     },
  //     {
  //       "CodEco": 22638,
  //       "DesEco": "Actividades Día Mundial Discapacidad"
  //     },
  //     {
  //       "CodEco": 22640,
  //       "DesEco": "Programa transf."
  //     },
  //     {
  //       "CodEco": 22643,
  //       "DesEco": "Gastos diversos"
  //     },
  //     {
  //       "CodEco": 22654,
  //       "DesEco": "Actividades convivencia intercultural"
  //     },
  //     {
  //       "CodEco": 22655,
  //       "DesEco": "Programa subvencionado zonas"
  //     },
  //     {
  //       "CodEco": 22656,
  //       "DesEco": "Programa plan zona sur no subvencionado"
  //     },
  //     {
  //       "CodEco": 22657,
  //       "DesEco": "Actividades programa participación y solidaridad"
  //     },
  //     {
  //       "CodEco": 22659,
  //       "DesEco": "Actividades Institucionales"
  //     },
  //     {
  //       "CodEco": 22661,
  //       "DesEco": "Programa voluntariado"
  //     },
  //     {
  //       "CodEco": 22662,
  //       "DesEco": "Por obras a cargo de terceros"
  //     },
  //     {
  //       "CodEco": 22663,
  //       "DesEco": "Gastos diversos proyecto casa mujeres"
  //     },
  //     {
  //       "CodEco": 22664,
  //       "DesEco": "Dinamización asociaciones"
  //     },
  //     {
  //       "CodEco": 22665,
  //       "DesEco": "Campaña contra la violencia de género"
  //     },
  //     {
  //       "CodEco": 22666,
  //       "DesEco": "Proyecto salud nuestra ciudad"
  //     },
  //     {
  //       "CodEco": 22667,
  //       "DesEco": "Programa municipal prevención acciones"
  //     },
  //     {
  //       "CodEco": 22670,
  //       "DesEco": "Programas actuacion en distritos"
  //     },
  //     {
  //       "CodEco": 22672,
  //       "DesEco": "Ecomercado"
  //     },
  //     {
  //       "CodEco": 22673,
  //       "DesEco": "Plan Especial San Juan de Dios"
  //     },
  //     {
  //       "CodEco": 22674,
  //       "DesEco": "Actividades de dinamización"
  //     },
  //     {
  //       "CodEco": 22699,
  //       "DesEco": "Otros gastos diversos"
  //     },
  //     {
  //       "CodEco": 22700,
  //       "DesEco": "Limpieza y aseo"
  //     },
  //     {
  //       "CodEco": 22701,
  //       "DesEco": "Seguridad"
  //     },
  //     {
  //       "CodEco": 22702,
  //       "DesEco": "Valoraciones y peritajes"
  //     },
  //     {
  //       "CodEco": 22704,
  //       "DesEco": "Custodia, depósito y almacenaje"
  //     },
  //     {
  //       "CodEco": 22706,
  //       "DesEco": "Estudios y trabajos técnicos"
  //     },
  //     {
  //       "CodEco": 22707,
  //       "DesEco": "Estudios y trabajos técnicos"
  //     },
  //     {
  //       "CodEco": 22708,
  //       "DesEco": "Servicios de recaudación a favor de la entidad"
  //     },
  //     {
  //       "CodEco": 22709,
  //       "DesEco": "Recogida de residuos urbanos"
  //     },
  //     {
  //       "CodEco": 22710,
  //       "DesEco": "Conservación y mantenimiento planta compostaje y reciclaje"
  //     },
  //     {
  //       "CodEco": 22712,
  //       "DesEco": "Limpieza dependencias municipales"
  //     },
  //     {
  //       "CodEco": 22713,
  //       "DesEco": "Mantenimiento alumbrado público"
  //     },
  //     {
  //       "CodEco": 22714,
  //       "DesEco": "Mantenimiento parques y jardines públicos"
  //     },
  //     {
  //       "CodEco": 22715,
  //       "DesEco": "Mantenimiento Red Semafórica"
  //     },
  //     {
  //       "CodEco": 22716,
  //       "DesEco": "Mantenimiento señalización horizontal"
  //     },
  //     {
  //       "CodEco": 22717,
  //       "DesEco": "Mantenimiento señalización vertical"
  //     },
  //     {
  //       "CodEco": 22718,
  //       "DesEco": "Control tarjetas O.R.A."
  //     },
  //     {
  //       "CodEco": 22719,
  //       "DesEco": "Conservación señalización horizontal, vertical y balizamiento"
  //     },
  //     {
  //       "CodEco": 22720,
  //       "DesEco": "Ayuda domiciliaria"
  //     },
  //     {
  //       "CodEco": 22722,
  //       "DesEco": "Limpieza colegios públicos"
  //     },
  //     {
  //       "CodEco": 22723,
  //       "DesEco": "Servicios técnicos (Veterinario, herrador,etc)"
  //     },
  //     {
  //       "CodEco": 22726,
  //       "DesEco": "Teleasistencia domiciliaria"
  //     },
  //     {
  //       "CodEco": 22733,
  //       "DesEco": "Servicio transporte autobuses a pedanias"
  //     },
  //     {
  //       "CodEco": 22734,
  //       "DesEco": "Servicio atención de día infantil y juvenil"
  //     },
  //     {
  //       "CodEco": 22735,
  //       "DesEco": "Alumbrado decorativo fiestas"
  //     },
  //     {
  //       "CodEco": 22736,
  //       "DesEco": "Alumbrado decorativo Navidad"
  //     },
  //     {
  //       "CodEco": 22746,
  //       "DesEco": "Balizamiento y B.R.V."
  //     },
  //     {
  //       "CodEco": 22747,
  //       "DesEco": "Mantenimiento de parques infantiles"
  //     },
  //     {
  //       "CodEco": 22748,
  //       "DesEco": "Mantenimiento y alquiler WC botellodromo"
  //     },
  //     {
  //       "CodEco": 22749,
  //       "DesEco": "Mantenimiento de fuentes ornamentales"
  //     },
  //     {
  //       "CodEco": 22755,
  //       "DesEco": "Programa individual atención"
  //     },
  //     {
  //       "CodEco": 22760,
  //       "DesEco": "Atencion a la ciudadania en distritos"
  //     },
  //     {
  //       "CodEco": 22799,
  //       "DesEco": "Otros trabajos realizados por otras empresas y profesionales"
  //     },
  //     {
  //       "CodEco": 23000,
  //       "DesEco": "Dietas miembros de los organos de gobierno"
  //     },
  //     {
  //       "CodEco": 23010,
  //       "DesEco": "Dietas del personal directivo"
  //     },
  //     {
  //       "CodEco": 23020,
  //       "DesEco": "Dietas del personal no directivo"
  //     },
  //     {
  //       "CodEco": 23100,
  //       "DesEco": "Locomocion de miembros organos gobierno"
  //     },
  //     {
  //       "CodEco": 23110,
  //       "DesEco": "Del personal directivo"
  //     },
  //     {
  //       "CodEco": 23120,
  //       "DesEco": "Del personal no directivo"
  //     },
  //     {
  //       "CodEco": 23300,
  //       "DesEco": "Otras indemnizaciones"
  //     },
  //     {
  //       "CodEco": 30000,
  //       "DesEco": "Intereses de obligaciones y bonos-Deuda"
  //     },
  //     {
  //       "CodEco": 31000,
  //       "DesEco": "Intereses préstamo interior"
  //     },
  //     {
  //       "CodEco": 31100,
  //       "DesEco": "Gastos formalización,modificación y cancelación operaciones en euros"
  //     },
  //     {
  //       "CodEco": 35200,
  //       "DesEco": "Intereses de demora"
  //     },
  //     {
  //       "CodEco": 35201,
  //       "DesEco": "Intereses de demora a acreedores públicos"
  //     },
  //     {
  //       "CodEco": 35210,
  //       "DesEco": "Intereses de demora a acreedores públicos otros"
  //     },
  //     {
  //       "CodEco": 35300,
  //       "DesEco": "Operaciones de intercambio financiero"
  //     },
  //     {
  //       "CodEco": 35900,
  //       "DesEco": "Otros gastos financieros"
  //     },
  //     {
  //       "CodEco": 41001,
  //       "DesEco": "Patronato Municipal Parque Zoológico"
  //     },
  //     {
  //       "CodEco": 41003,
  //       "DesEco": "Fundación Municipal de Formación y Empleo"
  //     },
  //     {
  //       "CodEco": 44900,
  //       "DesEco": "AJEMSA- Serv. agua, alcantarillado y recogida de residuos"
  //     },
  //     {
  //       "CodEco": 44901,
  //       "DesEco": "EMEMSA-Explotación de los Montes de Propio, S.A."
  //     },
  //     {
  //       "CodEco": 44902,
  //       "DesEco": "JECOMUSA-Servicio de radio y television Municipal"
  //     },
  //     {
  //       "CodEco": 44903,
  //       "DesEco": "JEREYSSA-Servicio de Recaudación"
  //     },
  //     {
  //       "CodEco": 44904,
  //       "DesEco": "COMUJESA"
  //     },
  //     {
  //       "CodEco": 44905,
  //       "DesEco": "EMUVIJESA"
  //     },
  //     {
  //       "CodEco": 44906,
  //       "DesEco": "CIRJESA-Circuito de Jerez, S.A."
  //     },
  //     {
  //       "CodEco": 44907,
  //       "DesEco": "Otras subvenciones a entes públicos y sociedades mercantiles"
  //     },
  //     {
  //       "CodEco": 44910,
  //       "DesEco": "JESYTEL-Servicios Informaticos Internos"
  //     },
  //     {
  //       "CodEco": 44990,
  //       "DesEco": "Otras subvenciones a entes públicos y sociedades mercantiles"
  //     },
  //     {
  //       "CodEco": 46100,
  //       "DesEco": "Transferencias a entidades"
  //     },
  //     {
  //       "CodEco": 46200,
  //       "DesEco": "Transferencias a Ayuntamientos"
  //     },
  //     {
  //       "CodEco": 46600,
  //       "DesEco": "A otras entidades agrupen municipios"
  //     },
  //     {
  //       "CodEco": 46601,
  //       "DesEco": "Mancomunidad municipios Bahía Cádiz"
  //     },
  //     {
  //       "CodEco": 46700,
  //       "DesEco": "Consorcio Bomberos Provincia Cádiz"
  //     },
  //     {
  //       "CodEco": 46702,
  //       "DesEco": "Consorcio Metropolitano Transporte Bahia Cádiz"
  //     },
  //     {
  //       "CodEco": 46703,
  //       "DesEco": "Consorcio de Aguas de la Zona Gaditana"
  //     },
  //     {
  //       "CodEco": 46800,
  //       "DesEco": "A Entidades Locales Autónomas"
  //     },
  //     {
  //       "CodEco": 46801,
  //       "DesEco": "Fondo compensación ELA por crecimiento habitantes desde convenio vigente"
  //     },
  //     {
  //       "CodEco": 47000,
  //       "DesEco": "Subvención empresas privadas para fomento empleo"
  //     },
  //     {
  //       "CodEco": 47001,
  //       "DesEco": "Prog. Mpal. apoyo emprendiemiento y la"
  //     },
  //     {
  //       "CodEco": 47002,
  //       "DesEco": "Plan Promoción de Empleo"
  //     },
  //     {
  //       "CodEco": 47003,
  //       "DesEco": "Ordenanzas Reg. Fomento desarrollo económico Jerez"
  //     },
  //     {
  //       "CodEco": 47200,
  //       "DesEco": "Subvección deficit transporte colectivo urbano"
  //     },
  //     {
  //       "CodEco": 47900,
  //       "DesEco": "Otras subvenciones a empresas privadas"
  //     },
  //     {
  //       "CodEco": 47902,
  //       "DesEco": "Escuela Negocios de Jerez"
  //     },
  //     {
  //       "CodEco": 48000,
  //       "DesEco": "Atenciones benéficiencia y asistencia"
  //     },
  //     {
  //       "CodEco": 48003,
  //       "DesEco": "Ayudas a Bono-Taxi"
  //     },
  //     {
  //       "CodEco": 48004,
  //       "DesEco": "Ayudas sociales alquiler"
  //     },
  //     {
  //       "CodEco": 48100,
  //       "DesEco": "Premios, becas y pensiones de estudio"
  //     },
  //     {
  //       "CodEco": 48800,
  //       "DesEco": "Cooperación internacional y ayuda a"
  //     },
  //     {
  //       "CodEco": 48801,
  //       "DesEco": "Coordinadora ONGDS de la provincia de Cádiz"
  //     },
  //     {
  //       "CodEco": 48900,
  //       "DesEco": "Otras transferencias"
  //     },
  //     {
  //       "CodEco": 48901,
  //       "DesEco": "Ayudas a banda de música"
  //     },
  //     {
  //       "CodEco": 48902,
  //       "DesEco": "Atencion sociales en interes de la ciudad"
  //     },
  //     {
  //       "CodEco": 48903,
  //       "DesEco": "Fundación Caballero Bonald"
  //     },
  //     {
  //       "CodEco": 48904,
  //       "DesEco": "Fundación Teatro Villamarta"
  //     },
  //     {
  //       "CodEco": 48905,
  //       "DesEco": "Fundación Andrés de Ribera"
  //     },
  //     {
  //       "CodEco": 48906,
  //       "DesEco": "Fundación Centro Acogida San José"
  //     },
  //     {
  //       "CodEco": 48907,
  //       "DesEco": "Consejo Económico y Social"
  //     },
  //     {
  //       "CodEco": 48908,
  //       "DesEco": "FUNDARTE"
  //     },
  //     {
  //       "CodEco": 48911,
  //       "DesEco": "Subvención al Taxi accesible"
  //     },
  //     {
  //       "CodEco": 48917,
  //       "DesEco": "Speed Festival"
  //     },
  //     {
  //       "CodEco": 48918,
  //       "DesEco": "Fundación Secretariado General Gitano"
  //     },
  //     {
  //       "CodEco": 48921,
  //       "DesEco": "Comedor El Salvador"
  //     },
  //     {
  //       "CodEco": 48922,
  //       "DesEco": "Cruz Roja Jerez (UMES)"
  //     },
  //     {
  //       "CodEco": 48923,
  //       "DesEco": "Colegio Oficial Veterinarios de Cádiz"
  //     },
  //     {
  //       "CodEco": 48924,
  //       "DesEco": "Cruz Roja -Transporte"
  //     },
  //     {
  //       "CodEco": 48925,
  //       "DesEco": "Convenio apoyo proceso"
  //     },
  //     {
  //       "CodEco": 48926,
  //       "DesEco": "Convenio APESORJE"
  //     },
  //     {
  //       "CodEco": 48927,
  //       "DesEco": "Convenio AFEMEN"
  //     },
  //     {
  //       "CodEco": 48928,
  //       "DesEco": "Centro de día Hogar San Juan"
  //     },
  //     {
  //       "CodEco": 48929,
  //       "DesEco": "Fundaciones"
  //     },
  //     {
  //       "CodEco": 48930,
  //       "DesEco": "Economato San Juan de Dios"
  //     },
  //     {
  //       "CodEco": 48931,
  //       "DesEco": "Banco de alimentos"
  //     },
  //     {
  //       "CodEco": 48932,
  //       "DesEco": "Centro acogida inmigrantes (CEAIN)"
  //     },
  //     {
  //       "CodEco": 48933,
  //       "DesEco": "Grupo desarrollo rural"
  //     },
  //     {
  //       "CodEco": 48936,
  //       "DesEco": "Convocatoria unica de subvenciones"
  //     },
  //     {
  //       "CodEco": 48937,
  //       "DesEco": "Proyecto Hombre"
  //     },
  //     {
  //       "CodEco": 48938,
  //       "DesEco": "Asociación de Ciudades Interculturales"
  //     },
  //     {
  //       "CodEco": 48939,
  //       "DesEco": "Todos con Casa"
  //     },
  //     {
  //       "CodEco": 49000,
  //       "DesEco": "Al exterior"
  //     },
  //     {
  //       "CodEco": 50000,
  //       "DesEco": "Fondo Contingencia de Ejecución Presupuestaria (Art.31 LOEPSF)"
  //     },
  //     {
  //       "CodEco": 60000,
  //       "DesEco": "Inversionse nuevas en terrenos destinados al"
  //     },
  //     {
  //       "CodEco": 60201,
  //       "DesEco": "Cargas urbanisticas"
  //     },
  //     {
  //       "CodEco": 60216,
  //       "DesEco": "Reurbanización C/Cantareria y C/Nueva (Actuaciones barrio Santiago)"
  //     },
  //     {
  //       "CodEco": 60219,
  //       "DesEco": "Reforma y ampliación Peña Los Juncales en"
  //     },
  //     {
  //       "CodEco": 60222,
  //       "DesEco": "Actuacionse resto Convenio"
  //     },
  //     {
  //       "CodEco": 60227,
  //       "DesEco": "Urbanización U.E. 4S2 San Jeronimo B - 1ª Fase"
  //     },
  //     {
  //       "CodEco": 60230,
  //       "DesEco": "Urbanización U.E. 1A18 Mreced"
  //     },
  //     {
  //       "CodEco": 60231,
  //       "DesEco": "Urbanización vial entre UE 2T1 Armas Santiago y 1A18 Merced"
  //     },
  //     {
  //       "CodEco": 60234,
  //       "DesEco": "Remodelacion vial glorieta Cuatro Caminos con nudo enlace N-"
  //     },
  //     {
  //       "CodEco": 60235,
  //       "DesEco": "Otras obras conexión norte"
  //     },
  //     {
  //       "CodEco": 60236,
  //       "DesEco": "Urbanización U.E. 4K1 Y 2M El Angel (C/Atlanta y eje)"
  //     },
  //     {
  //       "CodEco": 60237,
  //       "DesEco": "Construcción de glorieta en A-4 accesos al sector sup 34"
  //     },
  //     {
  //       "CodEco": 60238,
  //       "DesEco": "C onexión con sistema general viario U.E. 2Q1 Arroyo Membrillar"
  //     },
  //     {
  //       "CodEco": 60239,
  //       "DesEco": "Escultura rotonda de Cuatro Caminos"
  //     },
  //     {
  //       "CodEco": 60302,
  //       "DesEco": "Proyectos modificados y liquidaciones obras convenio educación"
  //     },
  //     {
  //       "CodEco": 60303,
  //       "DesEco": "Campo de futbol 7 barriada La Granja"
  //     },
  //     {
  //       "CodEco": 60418,
  //       "DesEco": "Instalacion maquinaria aire acondicionado Casa de la Mujer II fase"
  //     },
  //     {
  //       "CodEco": 60420,
  //       "DesEco": "Museo de la Ciudad de Jerez"
  //     },
  //     {
  //       "CodEco": 60701,
  //       "DesEco": "Obras accesibilidad 2005. Convenio IMSERSO Y ONCE"
  //     },
  //     {
  //       "CodEco": 60702,
  //       "DesEco": "Actuaciones en El Alcazar"
  //     },
  //     {
  //       "CodEco": 60703,
  //       "DesEco": "A/C restauración y rehabilitación sala Profundis Claustros de Santo Domingo"
  //     },
  //     {
  //       "CodEco": 60704,
  //       "DesEco": "Construcción de centro europeo de la música andalusí"
  //     },
  //     {
  //       "CodEco": 60711,
  //       "DesEco": "Claustros de Santo Domingo"
  //     },
  //     {
  //       "CodEco": 60900,
  //       "DesEco": "Otras inversiones nuevas en infraestructuras y bienes para u"
  //     },
  //     {
  //       "CodEco": 60902,
  //       "DesEco": "Obras Plan Urban"
  //     },
  //     {
  //       "CodEco": 60903,
  //       "DesEco": "Obras Fondo Estatal de Inversión Local"
  //     },
  //     {
  //       "CodEco": 60905,
  //       "DesEco": "Fondo estatatal para el empleo y sostenibilidad local"
  //     },
  //     {
  //       "CodEco": 60906,
  //       "DesEco": "EDUSI"
  //     },
  //     {
  //       "CodEco": 60907,
  //       "DesEco": "Urbanizacion de parcela edificio Jefatura de Policia Local"
  //     },
  //     {
  //       "CodEco": 60908,
  //       "DesEco": "Urbanizacion de entorno de San Juan de los Caballeros"
  //     },
  //     {
  //       "CodEco": 60910,
  //       "DesEco": "Reordenación de Plaza Belén"
  //     },
  //     {
  //       "CodEco": 60911,
  //       "DesEco": "Adecuacion espacios libres calle Taxdirt"
  //     },
  //     {
  //       "CodEco": 60913,
  //       "DesEco": "Reurbanizacion parque forestal La Marquesa"
  //     },
  //     {
  //       "CodEco": 60914,
  //       "DesEco": "Instalación areas de recreo infantil en diferentes zonas de Jerez"
  //     },
  //     {
  //       "CodEco": 60916,
  //       "DesEco": "Instalacion de circuitos biosaludables en espacios públicos"
  //     },
  //     {
  //       "CodEco": 60918,
  //       "DesEco": "Adecuación espacios públicos entorno centro comercial Area Sur"
  //     },
  //     {
  //       "CodEco": 60920,
  //       "DesEco": "Otras inversiones financ.con ejecución avales"
  //     },
  //     {
  //       "CodEco": 60921,
  //       "DesEco": "Dotac.escaleras, rampas y acerados mejora acces.Zona Sur"
  //     },
  //     {
  //       "CodEco": 60922,
  //       "DesEco": "Urbanización ARI F-05- La Hoyanca"
  //     },
  //     {
  //       "CodEco": 60923,
  //       "DesEco": "Urbanización Calle Varsovia"
  //     },
  //     {
  //       "CodEco": 60925,
  //       "DesEco": "Sector 30 San José Obrero"
  //     },
  //     {
  //       "CodEco": 60926,
  //       "DesEco": "U.E. 2.G.1 Pelirón-Planemiento y Gestión"
  //     },
  //     {
  //       "CodEco": 60927,
  //       "DesEco": "Expediente Reparcelación de la U.E. 4.S.2 \"San Jerónimo B"
  //     },
  //     {
  //       "CodEco": 60928,
  //       "DesEco": "Expediente Reparcelación de la U.E. 4.S1 \"San Jerónimo A"
  //     },
  //     {
  //       "CodEco": 60929,
  //       "DesEco": "Expediente Reparcelación de la U.E. 4.A.4 \"Entrevías"
  //     },
  //     {
  //       "CodEco": 60942,
  //       "DesEco": "Urbanización UE 2T1 Armas de Santiago"
  //     },
  //     {
  //       "CodEco": 60943,
  //       "DesEco": "Expropiación forzosa Poligono 4 PAU 1 Fdo. Portillo"
  //     },
  //     {
  //       "CodEco": 60945,
  //       "DesEco": "Obras de urbanización calle C - UE 4Q1 \"El Portal"
  //     },
  //     {
  //       "CodEco": 60946,
  //       "DesEco": "Ejecución aval UE 4G4B Pago Perceba"
  //     },
  //     {
  //       "CodEco": 60947,
  //       "DesEco": "Aparatos biosaludables parques urbanos"
  //     },
  //     {
  //       "CodEco": 60948,
  //       "DesEco": "Mant.conserv.espacios pbcos. y viario Bda. S.Juan de Dios"
  //     },
  //     {
  //       "CodEco": 60949,
  //       "DesEco": "Reurbanización de Plaza Vargas y adyacentes"
  //     },
  //     {
  //       "CodEco": 60952,
  //       "DesEco": "Sum.mobiliario parques y jardines - ELA La Barca Florida"
  //     },
  //     {
  //       "CodEco": 60953,
  //       "DesEco": "Sum.19 lumnarias led y valla perimetral - ELA Nueva Jarilla"
  //     },
  //     {
  //       "CodEco": 60954,
  //       "DesEco": "Sum.mobiliario, aparatos biosaludables-ELA S.Isidro G."
  //     },
  //     {
  //       "CodEco": 60955,
  //       "DesEco": "Adquisición mobiliario y enseres parques mpal.-ELA El Torno"
  //     },
  //     {
  //       "CodEco": 60956,
  //       "DesEco": "Adecentamiento, pavimentación,vallado calles ELA Estella Mar"
  //     },
  //     {
  //       "CodEco": 60957,
  //       "DesEco": "Mejora de viales públicos 3ª F-ELA Guadalcacín"
  //     },
  //     {
  //       "CodEco": 60958,
  //       "DesEco": "Cubierta Pque Mpal Francisco J Martínez Fdez ELA Nueva Jaril"
  //     },
  //     {
  //       "CodEco": 60959,
  //       "DesEco": "Cubierta En Parque Mpal Esperanza Román ELA S. Isidro G"
  //     },
  //     {
  //       "CodEco": 60960,
  //       "DesEco": "Sum. de Mobiliario y Carpa de Recinto Romería ELA N.Jarill"
  //     },
  //     {
  //       "CodEco": 60961,
  //       "DesEco": "Adq. de Caseta Prefab Aseos para P.Mpal E.Román ELA S.Isidro"
  //     },
  //     {
  //       "CodEco": 60962,
  //       "DesEco": "Juegos de Calistenia Parque Mpal En Plaza Pablo Ig ELA S. Is"
  //     },
  //     {
  //       "CodEco": 60963,
  //       "DesEco": "Adquisición de Elementos de Juegos Infantiles ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 60964,
  //       "DesEco": "Adq. de Mobiliario de Parques y Jardines ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 60965,
  //       "DesEco": "Adq. Losetas de Caucho para Suelo de Parques y Jar ELA Torre"
  //     },
  //     {
  //       "CodEco": 60966,
  //       "DesEco": "Obras de urbanización U.E. 8.E.2. Parque Empresarial 2"
  //     },
  //     {
  //       "CodEco": 60967,
  //       "DesEco": "Mejoras de equipamientos y zonas verdes"
  //     },
  //     {
  //       "CodEco": 60968,
  //       "DesEco": "Terminación de obras Sector 26 1ª Fase"
  //     },
  //     {
  //       "CodEco": 60975,
  //       "DesEco": "POS 2006 Asfaltado varias calles en Nueva Jarilla"
  //     },
  //     {
  //       "CodEco": 60977,
  //       "DesEco": "Reord.y urban.Pl.Orbaneja y c/Sta.María G. y Juana Dios Lacoste"
  //     },
  //     {
  //       "CodEco": 60998,
  //       "DesEco": "Obras POS"
  //     },
  //     {
  //       "CodEco": 61900,
  //       "DesEco": "Otras inversiones en infraestructuras"
  //     },
  //     {
  //       "CodEco": 61901,
  //       "DesEco": "Reurbanización de Plaza Zahara- Vías"
  //     },
  //     {
  //       "CodEco": 61902,
  //       "DesEco": "Rehabilitacion techos de galeria soportales de Madre de Dios"
  //     },
  //     {
  //       "CodEco": 61903,
  //       "DesEco": "Refuerzo de firme varias calles"
  //     },
  //     {
  //       "CodEco": 61904,
  //       "DesEco": "Ordenación y modern mercadillo Parada y"
  //     },
  //     {
  //       "CodEco": 61906,
  //       "DesEco": "Reforma de infraestructuras en barriada ICOVESA"
  //     },
  //     {
  //       "CodEco": 61909,
  //       "DesEco": "Conservacion y mantenimiento en mercado central de abastos"
  //     },
  //     {
  //       "CodEco": 61910,
  //       "DesEco": "Adecentamiento de vías públicas ELA Estella del Marqués"
  //     },
  //     {
  //       "CodEco": 61911,
  //       "DesEco": "Mejoras alumbrado público ELA Estella del Marqués"
  //     },
  //     {
  //       "CodEco": 61912,
  //       "DesEco": "Reparación saneamiento vía pública ELA Guadalcacin"
  //     },
  //     {
  //       "CodEco": 61913,
  //       "DesEco": "Cambio luminaria pública a LED piscina municipal ELA El Torno"
  //     },
  //     {
  //       "CodEco": 61914,
  //       "DesEco": "Adaptación de viales públicos ELA Guadalcacín"
  //     },
  //     {
  //       "CodEco": 61915,
  //       "DesEco": "Asfaltado de viales públicos ELA La Barca de la Florida"
  //     },
  //     {
  //       "CodEco": 61916,
  //       "DesEco": "Dotación mobiliario infantil y urbano parques ELA Nueva Jarilla"
  //     },
  //     {
  //       "CodEco": 61917,
  //       "DesEco": "Sustitución de luminaria pública a LED ELA Estella Marqués"
  //     },
  //     {
  //       "CodEco": 61918,
  //       "DesEco": "Sum. de Césped Artificial para Zonas Ajardinadas ELA N. Jari"
  //     },
  //     {
  //       "CodEco": 61919,
  //       "DesEco": "Mejoras de acerado y accesibilidad"
  //     },
  //     {
  //       "CodEco": 61920,
  //       "DesEco": "Renovación acerados y mejoras accesibilidad Puertas del Sur"
  //     },
  //     {
  //       "CodEco": 61970,
  //       "DesEco": "Actuaciones varias"
  //     },
  //     {
  //       "CodEco": 61971,
  //       "DesEco": "Tu Barrio nuestro Centro - Organos de"
  //     },
  //     {
  //       "CodEco": 62200,
  //       "DesEco": "Edificios y otras construcciones"
  //     },
  //     {
  //       "CodEco": 62202,
  //       "DesEco": "Contrucción nave cobertizo instalaciones deportivas ELA San Isidro"
  //     },
  //     {
  //       "CodEco": 62201,
  //       "DesEco": "Construcc.Centro Polivalente de uso social S.José Obrero"
  //     },
  //     {
  //       "CodEco": 62203,
  //       "DesEco": "Construcción vestuarios adaptados instalaciones deportivas ELA San Isidro"
  //     },
  //     {
  //       "CodEco": 62204,
  //       "DesEco": "Construcción de Aseos y Almacén En Edificio Mpal ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 62205,
  //       "DesEco": "Mejora de Escenario En Edificio Mpal ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 62206,
  //       "DesEco": "Centro tecnológico del Motor"
  //     },
  //     {
  //       "CodEco": 62207,
  //       "DesEco": "Eje. de Aseos y Vestuarios Adaptados  Discapac. ELA S. Isidr"
  //     },
  //     {
  //       "CodEco": 62237,
  //       "DesEco": "Parque flotante desmontable"
  //     },
  //     {
  //       "CodEco": 62246,
  //       "DesEco": "Remodelacion edificio junto estacion tren (imprenta municipal)"
  //     },
  //     {
  //       "CodEco": 62300,
  //       "DesEco": "Maquinaria, instalaciones y utillaje"
  //     },
  //     {
  //       "CodEco": 62302,
  //       "DesEco": "Adquisición equipo de videoconferencia"
  //     },
  //     {
  //       "CodEco": 62308,
  //       "DesEco": "Adquisición máquina recogida residuos ELA Estella Marqués"
  //     },
  //     {
  //       "CodEco": 62310,
  //       "DesEco": "Adquisicion maquinaria, instalaciones y utillaje"
  //     },
  //     {
  //       "CodEco": 62324,
  //       "DesEco": "Adquisición maquinaria Imprenta"
  //     },
  //     {
  //       "CodEco": 62348,
  //       "DesEco": "Instalación cámara frigorífica Mdo"
  //     },
  //     {
  //       "CodEco": 62367,
  //       "DesEco": "Maquinaria de Impresión Offet Cuatro"
  //     },
  //     {
  //       "CodEco": 62368,
  //       "DesEco": "Fase de Manipulado para Imprenta"
  //     },
  //     {
  //       "CodEco": 62369,
  //       "DesEco": "Máquina numeradora de aspas Imprenta"
  //     },
  //     {
  //       "CodEco": 62378,
  //       "DesEco": "Biomaza en piscina Zona Sur-Piscinas"
  //     },
  //     {
  //       "CodEco": 62400,
  //       "DesEco": "Adquisición elementos de transporte"
  //     },
  //     {
  //       "CodEco": 62420,
  //       "DesEco": "Adquisicion material de transporte"
  //     },
  //     {
  //       "CodEco": 62500,
  //       "DesEco": "Mobiliario y enseres"
  //     },
  //     {
  //       "CodEco": 62514,
  //       "DesEco": "Climatizacion de instalaciones"
  //     },
  //     {
  //       "CodEco": 62551,
  //       "DesEco": "Equipamiento Centro de Día-Serv grales de"
  //     },
  //     {
  //       "CodEco": 62565,
  //       "DesEco": "Equipamiento C.Cívico La Granja-Serv Gles"
  //     },
  //     {
  //       "CodEco": 62600,
  //       "DesEco": "Equipos para procesos de información"
  //     },
  //     {
  //       "CodEco": 62603,
  //       "DesEco": "Adquisición equipo informatico"
  //     },
  //     {
  //       "CodEco": 62752,
  //       "DesEco": "Instalación cesped artifical campo futbol Picadueñas"
  //     },
  //     {
  //       "CodEco": 62765,
  //       "DesEco": "Centro de Formación Municipal-Formación"
  //     },
  //     {
  //       "CodEco": 62775,
  //       "DesEco": "Césped artificial cerramiento y vesturarios"
  //     },
  //     {
  //       "CodEco": 62779,
  //       "DesEco": "Equipamiento Sala Paúl"
  //     },
  //     {
  //       "CodEco": 62785,
  //       "DesEco": "Presupuestos participativos pendientes ejecución anterior"
  //     },
  //     {
  //       "CodEco": 62787,
  //       "DesEco": "Remod/adaptac Escuela Policía en Est."
  //     },
  //     {
  //       "CodEco": 62788,
  //       "DesEco": "Inst césped artif Campo Futbol San Ginés y"
  //     },
  //     {
  //       "CodEco": 62790,
  //       "DesEco": "Inversiones en instalaciones"
  //     },
  //     {
  //       "CodEco": 62900,
  //       "DesEco": "Otras inversiones nuevas asociadas funcionamiento operativo servicio"
  //     },
  //     {
  //       "CodEco": 62901,
  //       "DesEco": "Otros gastos de inversión-Policía Local"
  //     },
  //     {
  //       "CodEco": 62902,
  //       "DesEco": "Inversiones asociadas a actuaciones urbanísticas"
  //     },
  //     {
  //       "CodEco": 62905,
  //       "DesEco": "Equipos y materiales para serv prev riesgos"
  //     },
  //     {
  //       "CodEco": 62907,
  //       "DesEco": "Adquisición equipos análisis"
  //     },
  //     {
  //       "CodEco": 62908,
  //       "DesEco": "Sum.equipam.espacios deport. ELA La Barca de la Florida"
  //     },
  //     {
  //       "CodEco": 62909,
  //       "DesEco": "Sum.mobiliario para equip.cultural mpal. ELA El Torno"
  //     },
  //     {
  //       "CodEco": 62910,
  //       "DesEco": "Adquisición focos LED iluminación campo de fútbol Estella"
  //     },
  //     {
  //       "CodEco": 62911,
  //       "DesEco": "Adaptación piscina municiapal a  Normativa vigente ELA El Torno"
  //     },
  //     {
  //       "CodEco": 62912,
  //       "DesEco": "Suministro de gradas campo municipal futbol ELA San Isidro"
  //     },
  //     {
  //       "CodEco": 62913,
  //       "DesEco": "Suministro de equipamiento cultural ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 62914,
  //       "DesEco": "Adq. de Mobiliario y Enseres  Instalaciones Depor ELA Torno"
  //     },
  //     {
  //       "CodEco": 62915,
  //       "DesEco": "Suministro mobiliario para pabellón deportivo municipal ELA Nueva Jarilla"
  //     },
  //     {
  //       "CodEco": 62916,
  //       "DesEco": "Sum. de Mobiliario para Instalaciones Deportivas ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 62917,
  //       "DesEco": "Suministro proyectores LED campo de fútbol municipal ELA Nueva Jarilla"
  //     },
  //     {
  //       "CodEco": 62918,
  //       "DesEco": "Adaptación espacios complejo deportivo instalaciones municiapales ELA Torremelgarejo"
  //     },
  //     {
  //       "CodEco": 62921,
  //       "DesEco": "Equipo fotografico digital"
  //     },
  //     {
  //       "CodEco": 63100,
  //       "DesEco": "Terrenos y bienes naturales"
  //     },
  //     {
  //       "CodEco": 63200,
  //       "DesEco": "Inversión, reposición edificios y otras construcciones"
  //     },
  //     {
  //       "CodEco": 63201,
  //       "DesEco": "Plan de actuación en colegios pedanias"
  //     },
  //     {
  //       "CodEco": 63202,
  //       "DesEco": "Reparacion edificio gimnasio Campo de la Juventud"
  //     },
  //     {
  //       "CodEco": 63203,
  //       "DesEco": "Rehabilitacion fachadas biblioteca"
  //     },
  //     {
  //       "CodEco": 63204,
  //       "DesEco": "Actuaciones consolñidación Palacio"
  //     },
  //     {
  //       "CodEco": 63207,
  //       "DesEco": "Actuaciones consolidación Palacio Villapanes"
  //     },
  //     {
  //       "CodEco": 63208,
  //       "DesEco": "Actuaciones varias en Claustros de Santo Domingo"
  //     },
  //     {
  //       "CodEco": 63209,
  //       "DesEco": "Arreglos estación de autobuses"
  //     },
  //     {
  //       "CodEco": 63214,
  //       "DesEco": "Anctuaciones en aseos CEIP Guadalete ELA El Torno"
  //     },
  //     {
  //       "CodEco": 63215,
  //       "DesEco": "Actuaciones en piscina municipal ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 63216,
  //       "DesEco": "Rehabilitacioón centro cultural ELA Estella del Marqués"
  //     },
  //     {
  //       "CodEco": 63217,
  //       "DesEco": "Reparación sistema electronio campo futbol ELA Guadalcacin"
  //     },
  //     {
  //       "CodEco": 63218,
  //       "DesEco": "Rehabilitacion y mejoras zonas deportivas ELA San Isidro"
  //     },
  //     {
  //       "CodEco": 63219,
  //       "DesEco": "Rehabilitación piscina municipal ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 63222,
  //       "DesEco": "Rehabilitación oficinas para salud pca-Otras"
  //     },
  //     {
  //       "CodEco": 63223,
  //       "DesEco": "Actuaciones medioambientales Cementerio Municipal"
  //     },
  //     {
  //       "CodEco": 63226,
  //       "DesEco": "Centro de Arte Contemporáneo Callejón de los Bolos"
  //     },
  //     {
  //       "CodEco": 63227,
  //       "DesEco": "Puesta en valor del Cine Astoria"
  //     },
  //     {
  //       "CodEco": 63228,
  //       "DesEco": "Tabanco del Duque"
  //     },
  //     {
  //       "CodEco": 63229,
  //       "DesEco": "Rehabilitación antiguas escuelas de la ELA Torrecera"
  //     },
  //     {
  //       "CodEco": 63230,
  //       "DesEco": "Adecentamiento y reparación edificio consistorial ELA Estella Marques"
  //     },
  //     {
  //       "CodEco": 63231,
  //       "DesEco": "Adecuación infraestructuras CEIP Guadalete en ELA El Torno"
  //     },
  //     {
  //       "CodEco": 63232,
  //       "DesEco": "Rehabilitacion complejo Díez Mérito"
  //     },
  //     {
  //       "CodEco": 63300,
  //       "DesEco": "Inversión reposición maquinaria, instal utillaje-Instalaciones"
  //     },
  //     {
  //       "CodEco": 63500,
  //       "DesEco": "Inversión reposición mobiliario"
  //     },
  //     {
  //       "CodEco": 63900,
  //       "DesEco": "Otras inversiones de reposición asociadas al funcionamiento operativo"
  //     },
  //     {
  //       "CodEco": 63903,
  //       "DesEco": "Rehabilitacion y mejoras parque y pistal padel ELA La Barca"
  //     },
  //     {
  //       "CodEco": 63904,
  //       "DesEco": "Suministro de césped artificial campo de fútbol Guadalcacín"
  //     },
  //     {
  //       "CodEco": 63905,
  //       "DesEco": "Sustitución  cubierta pabellón polideportivo municipal Víctor Cor ELA La Barca"
  //     },
  //     {
  //       "CodEco": 63906,
  //       "DesEco": "Reforma y adecuación de piscinas municipales ELA Barca"
  //     },
  //     {
  //       "CodEco": 63907,
  //       "DesEco": "Reforma y adecuación de piscinas municipales ELA Nueva Jarilla"
  //     },
  //     {
  //       "CodEco": 64100,
  //       "DesEco": "Gastos en aplicaciones informáticas"
  //     },
  //     {
  //       "CodEco": 68100,
  //       "DesEco": "Terrenos y bienes naturales-Actuaciones PMS"
  //     },
  //     {
  //       "CodEco": 68101,
  //       "DesEco": "Adquisiciones en delimitaciones de areas"
  //     },
  //     {
  //       "CodEco": 68104,
  //       "DesEco": "Actuaciones PMS- Cerrofruto"
  //     },
  //     {
  //       "CodEco": 68200,
  //       "DesEco": "Gastos en inversiones de bienes patrimoniales"
  //     },
  //     {
  //       "CodEco": 68200,
  //       "DesEco": "Gastos en inv de bienes"
  //     },
  //     {
  //       "CodEco": 72000,
  //       "DesEco": "A la Administración General del Estado"
  //     },
  //     {
  //       "CodEco": 74000,
  //       "DesEco": "A EMUVIJESA-Gestión urbanistica"
  //     },
  //     {
  //       "CodEco": 74005,
  //       "DesEco": "A COMUJESA"
  //     },
  //     {
  //       "CodEco": 74007,
  //       "DesEco": "A CIRJESA-Circuito de Jerez"
  //     },
  //     {
  //       "CodEco": 74300,
  //       "DesEco": "A entes públicos y soc mercantiles de la Entidad Local"
  //     },
  //     {
  //       "CodEco": 75000,
  //       "DesEco": "A la administracióngeneral de las Comunidades Autónomas"
  //     },
  //     {
  //       "CodEco": 76100,
  //       "DesEco": "A Diputaciones, Consejos y cabildos"
  //     },
  //     {
  //       "CodEco": 76702,
  //       "DesEco": "Consorcio Metropolitano Transporte Bahía Cádiz"
  //     },
  //     {
  //       "CodEco": 77003,
  //       "DesEco": "Resarcimiento esfuerzo electrico IKEA"
  //     },
  //     {
  //       "CodEco": 78000,
  //       "DesEco": "Transferencia de capital a familias e instituciones sin fines lucro"
  //     },
  //     {
  //       "CodEco": 78900,
  //       "DesEco": "Otras transferencias de capital"
  //     },
  //     {
  //       "CodEco": 78904,
  //       "DesEco": "Transferencia capital Archic. Stmo.Cristo Expiración Ermita San Telmo"
  //     },
  //     {
  //       "CodEco": 78905,
  //       "DesEco": "Transferencia capital Orden Padres Mercedarios Rehabilitación Basílica Merced"
  //     },
  //     {
  //       "CodEco": 78906,
  //       "DesEco": "Fundación Centro Acogida San José"
  //     },
  //     {
  //       "CodEco": 78907,
  //       "DesEco": "Transferencia capital Hermandad La Sentencia Rehabilitación Ermita La Yedra"
  //     },
  //     {
  //       "CodEco": 78921,
  //       "DesEco": "Obras rehabilitación Bda. Asunción-Edifif y"
  //     },
  //     {
  //       "CodEco": 78923,
  //       "DesEco": "Fundación Andrés de Ribera-Promoción"
  //     },
  //     {
  //       "CodEco": 82190,
  //       "DesEco": "A otros subsectores"
  //     },
  //     {
  //       "CodEco": 83001,
  //       "DesEco": "Anticipos reintegros al personal a largo plazo"
  //     },
  //     {
  //       "CodEco": 83101,
  //       "DesEco": "Anticipos reintegros al personal a largo plazo"
  //     },
  //     {
  //       "CodEco": 85090,
  //       "DesEco": "Resto de adquisiciones de acciones del sector publico"
  //     },
  //     {
  //       "CodEco": 90100,
  //       "DesEco": "Amortización de Deuda Pública en euros a"
  //     },
  //     {
  //       "CodEco": 91100,
  //       "DesEco": "Amortización prestamos largo plazo entes sector público"
  //     },
  //     {
  //       "CodEco": 91300,
  //       "DesEco": "Amortización prestamos a medio y largo entes fuera sector público"
  //     },
  //     {
  //       "CodEco": 76700,
  //       "DesEco": "Transferencias a Consorcios. A revisar"
  //     },
  //     {
  //       "CodEco": 60917,
  //       "DesEco": "Inversiones reales. Medio rural. A revisar"
  //     },
  //     {
  //       "CodEco": 68900,
  //       "DesEco": "Inversiones reales. Cultura. A revisar"
  //     },
  //     {
  //       "CodEco": 68102,
  //       "DesEco": "Inversiones reales. Montes propios. A revisar"
  //     },
  //     {
  //       "CodEco": 60915,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 61907,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 61908,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 63210,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 63211,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 63901,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 63902,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     },
  //     {
  //       "CodEco": 65000,
  //       "DesEco": "Inversiones reales urbanismo. A revisar"
  //     }
  //   ];

  form = new FormGroup({
    ecoGasto: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    // console.log(economicos);
    this.ecoArray = economicos;
  }

  submit() {
    this.dataGraphGastosService.ecoGasto = this.form.value.ecoGasto;
    this.router.navigate(['/GraficoEconomicoGasto'])
  }

}
