import { iClient, IClientView } from "../types/client";

export const getTotal = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += parseFloat(item.summa));
  }, 0);
};

export const clientDto = (client:any) => {
  return {
    id: client.id,
    name: client.name,
    bill: client.bill,
    adres: client.adres,
    adresId: client.adres.name,
    street: client.street,
    home: client.home,
    phone: client.phone,
    isUsilok: client.isUsilok,
    isNoActive: client.isNoActive,
    records: client.records,
    description: client.description,
  };
};

export const clientsDto = (client: iClient) => {
  return {
    id: client.id,
    name: client.name,
    bill: client.bill,
    adres: client.adres.name,
    street: client.street,
    home: client.home,
    phone: client.phone,
    isUsilok: client.isUsilok,
    isNoActive: client.isNoActive,
    recordsSuma: getTotal(client.records), 
    description: client.description,
  };
};

