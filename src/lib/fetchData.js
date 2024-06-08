import prisma from "./prisma";


export async function getClients() {
    console.log('triger user');
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
        const homeA = parseInt(a?.home, 10);
        const homeB = parseInt(b?.home, 10);
        
        if (homeA < homeB) {
          return -1;
          }
        if (homeA > homeB) {
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
        return 0; 
      }
    )
      return newData;
    }
  
export async function getAdreses() {
    console.log('triger adres');
    const adreses = await prisma.adres.findMany();
    return adreses;
  }