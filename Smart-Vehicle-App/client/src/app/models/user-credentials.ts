export class UserCredentialsModel {
  username?: string;
  password?: string;
}

export class UserLoginSesionModel {
  id?: string;
  email?: string;
  nombre?: string;
  role?: string;
  token?: string;
  identificado: boolean = false;
}

export class ClientCredentialsRegisterModel {
  id?: string;
  tipo_documento?: string;
  nro_documento?: string;
  nombre_completo?: string;
  email?: string;
  departamento?: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  tipo_persona?: string;
}

export class AdvisorCredentialsRegisterModel {
  id?: string;
  nro_documento?: string;
  nombre_completo?: string;
  email?: string;
  telefono?: string;
  tipo_persona?: string;
}
