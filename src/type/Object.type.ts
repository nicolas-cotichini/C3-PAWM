export type Profilo = {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
};

export type Acquisto = {
  id?: number;
  idCommerciante?: number;
  idCliente: string;
  idNegozio?: number;
  dimensione: string;
  ordinato?: boolean;
  nomeNegozio?: string;
  data?: String;
};

export type Ordine = {
  id: number;
  idCliente?: number;
  stato: string;
  data: string;
};

export type OrdineInfo = {
  luogo: string;
  indirizzo: string;
  password?: Array<string>;
};

export type Cliente = {
  nome: string;
  cognome: string;
  email: string;
  password: string;
};

export type Personale = {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  ruolo?: PersonaleTipo;
  iva?: string;
  idLocker?: number;
};

export enum PersonaleTipo {
  "COMMERCIANTE" = 1,
  "CORRIERE",
  "MAGAZZINIERE",
  "AMMINISTRATORE",
}

export type Luogo = {
  id: number;
  indirizzo: string;
  note?: string;
  nome: string;
  tipo: LuogoTipo;
  orarioApertura?: string;
  idCommerciante?: string;
  interfaccia?: boolean;
};

export enum LuogoTipo {
  "MAGAZZINO" = 1,
  "LOCKER",
  "NEGOZIO",
}

export type Merce = {
  nome: string;
};
