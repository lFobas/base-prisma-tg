export interface iClient {
    id: string,
    name: string,
    bill: string,
    adres: iAdres,
    street: string,
    home: string,
    phone: string,
    isUsilok: boolean,
    isNoActive: boolean,
    records: iRecord[],
    description: string,
}

export interface IClientView {
    id: string;
    name: string;
    bill: string;
    adres: iAdres | null; // тільки назва, не об'єкт
    street: string;
    home: string;
    phone: string;
    isUsilok: boolean;
    isNoActive: boolean;
    recordsSuma: number; // сума записів
    description: string;
  }
  

export interface iRecord {
    id: string,
    date: Date,
    summa: number,
    description: string,
    authorId: string,
    author: iClient
}

export interface iAdres {
    id: string,
    name: string,
    street: string,
    home: string,
    
    authorId: string,
}