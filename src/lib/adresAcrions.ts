"use server";
import prisma from "./prisma";

export const getAdresiWithStreets = async () => {
    return await prisma.adres.findMany({
      include: { streets: true },
      orderBy: { name: "asc" },
    });
  };

export const getAdresiWithClients = async () => {
    return await prisma.adres.findMany({
      include: { clients: true },
      orderBy: { name: "asc" },
    });
  };
  
  export const addAdres = async (name: string) => {
    return await prisma.adres.create({ data: { name } });
  };
  
  export const deleteAdres = async (id: string) => {
    return await prisma.adres.delete({ where: { id } });
  };
  
  export const addStreet = async (adresId: string, name: string) => {
    return await prisma.street.create({
      data: {
        name,
        from: { connect: { id: adresId } },
      },
    });
  };
  
  export const deleteStreet = async (id: string) => {
    return await prisma.street.delete({ where: { id } });
  };