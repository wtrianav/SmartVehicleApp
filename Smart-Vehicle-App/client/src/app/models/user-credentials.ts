export class UserCredentialsModel {
  username?: string;
  password?: string;
}

export class UserLoginSesionModel {
  datos?: UserCredentialsModel;
  token?: string;
  identificado: boolean = false;
}

export class ClientCredentialsRegisterModel {
  tipo_documento?: string;
  numero_documento?: string;
  nombre_completo?: string;
  email?: string;
  departamento?: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  tipo_persona?: string;
}

export class AdvisorCredentialsRegisterModel {
  numero_documento?: string;
  nombre_completo?: string;
  email?: string;
  telefono?: string;
  tipo_persona?: string;
}