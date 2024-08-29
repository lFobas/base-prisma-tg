'use server'
import prisma from "./prisma";

export const editeClientById = async (id, body) =>{
    try {
        await prisma.client.update({
            where: {
                id: id
            },
            data: body
        })
    } catch (error) {
        console.error(error);
    }
}

export const getClientById = async (id)=> {
    const data = await prisma.client.findUnique({
        where: {
          id,
        },
        include: {
            records: true,
          },
      })
    data.records.forEach(record => {
          record.summa = Number(record.summa);
        });  
    return data
}

export async function getClients() {
    const data = await prisma.client.findMany({include: {
        records: true,
        adres: true,
      },})
      const newData = data.map(item => ({
        ...item,
        records: item.records.map(record => ({
          ...record,
          summa: Number(record.summa)
        }))
      }));
      newData.sort((a, b) => {
        const adresA = a.adres?.name; 
        const adresB = b.adres?.name;
        if (adresA < adresB) {
          return -1; 
        }
        if (adresA > adresB) {
          return 1; 
        }
        const streetA = a.street?.toLowerCase(); 
        const streetB = b.street?.toLowerCase();
        if (streetA < streetB) {
          return -1; 
        }
        if (streetA > streetB) {
          return 1; 
        }
        const homeA = parseInt(a?.home, 10);
        const homeB = parseInt(b?.home, 10);
        if (homeA < homeB) {
          return -1;
          }
        if (homeA > homeB) {
            return 1;
          }
        return 0; 
      }
    )
      return newData;
    }
  
export async function getAdreses() {
    const adreses = await prisma.adres.findMany();
    return adreses;
  }

export const getClientsByAdres = async (adres)=> {
    const data = await prisma.client.findMany({
        where: {
          adresId: adres,
        },
        include: {
            records: true,
            adres: true,
          },
      })
      const newData = data.map(item => ({
        ...item,
        records: item.records.map(record => ({
          ...record,
          summa: Number(record.summa)
        }))
      }));
      newData.sort((a, b) => {
        const streetA = a.street?.toLowerCase(); 
        const streetB = b.street?.toLowerCase();
        if (streetA < streetB) {
          return -1; 
        }
        if (streetA > streetB) {
          return 1; 
        }
        const homeA = parseInt(a?.home, 10);
        const homeB = parseInt(b?.home, 10);
        if (homeA < homeB) {
          return -1;
          }
        if (homeA > homeB) {
            return 1;
          }
        return 0; 
      }
    )  
    return newData
}

export const createRecords = async (data)=> {
    console.log(data);
    try {
      const res = await prisma.record.createMany({data})
      return res
    } catch (error) {
      return error
    }
    
}

export const getRecordsByDate = async (selectedDate) =>{
  const records = await prisma.record.findMany({
    where: {
      date: new Date(selectedDate)  // Перетворення selectedDate на об'єкт Date
    }
  });
  records.forEach(record => {
    record.summa = Number(record.summa);
  });
  return records;
}

export const editeRecordById = async (id, body) =>{
  try {
    const res = await prisma.record.update({
        where: {
            id: id
        },
        data: body
    })
    return res
} catch (error) {
    console.error(error);
    return error
}
}

export const tgUsersAnalitik = async (visitor) => {
  try {
    const visitorData = typeof visitor === 'string' ? JSON.parse(visitor) : visitor;

    const user = await prisma.user.upsert({
      where: { telegramId: visitorData.id },
      update: {},
      create: {
        name: visitorData.first_name,
        telegramId: visitorData.id,
      },
    });

    // Перетворення user на plain object
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in tgUsersAnalitik:", error);
    return { error: "Something went wrong" };
  }
};