export interface RequestModel {
    marca: string;
    modelo: string;
    tipo_solicitud: string;
    fecha_salida: string;
    fecha_retorno: string;
    fecha_venta: string;
    departamento: string;
    id: string;
    direccion: string;
    ciudad: string;
    estado: string;
    notas_asesor: string;
    valor: number;
    id_vehiculo: string;
    id_cliente: string;
    id_asesor: string;
}

export class RequestModelClass {
    solicitante?: string;
    marca?: string;
    modelo?: string;
    tipo_solicitud?: string;
    fecha_salida?: string;
    fecha_retorno?: string;
    fecha_venta?: string;
    departamento?: string;
    id?: string;
    direccion?: string;
    ciudad?: string;
    estado?: string;
    notas_asesor?: string;
    valor?: number;
    vehiculoId?: string;
    personaId?: string;
    asesorId?: string;
    codeudorId?: string;
}