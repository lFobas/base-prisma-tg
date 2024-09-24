const getTotal = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += parseFloat(item.summa));
  }, 0);
};

export const clientDto = (client) => {
  return {
    id: client.id,
    name: client.name,
    bill: client.bill,
    adres: client.adresId,
    street: client.street,
    home: client.home,
    phone: client.phone,
    isUsilok: client.isUsilok,
    isNoActive: client.isNoActive,
    records: client.records,
    description: client.description,
  };
};

export const clientsDto = (client) => {
  return {
    id: client.id,
    name: client.name,
    bill: client.bill,
    adres: client.adresId,
    street: client.street,
    home: client.home,
    phone: client.phone,
    isUsilok: client.isUsilok,
    isNoActive: client.isNoActive,
    records: getTotal(client.records),
    description: client.description,
  };
};
