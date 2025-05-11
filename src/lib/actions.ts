"use server";
import { clientsDto } from "./DTO/client";
import { userDto } from "./DTO/userDto";
import prisma from "./prisma";
import { iUser } from "./types/user";

export const editeClientById = async (id:string, body:any) => {
  try {
    await prisma.client.update({
      where: {
        id: id,
      },
      data: body,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getClientById = async (id: string) => {
  try {
    const data = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        records: true,
      },
    });

    if (!data) {
      return null;
    }

    const updatedRecords = data.records.map((record) => ({
      ...record,
      summa: Number(record.summa),
    }));

    return {
      ...data,
      records: updatedRecords,
    };
  } catch (error) {
    console.error("Помилка при отриманні клієнта:", error);
    throw new Error("Не вдалося отримати клієнта");
  }
};

export async function getClients() {
  const data:any = await prisma.client.findMany({
    include: {
      records: true,
      adres: true,
    },
  });
  const newData = data.map((item) => clientsDto(item))

  newData.sort((a, b) => {
    const adresA = a.adres;
    const adresB = b.adres;
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
  });
  return newData;
}

export async function getAdreses() {
  const adreses = await prisma.adres.findMany();
  return adreses;
}

export const getClientsByAdres = async (adres) => {
  const data:any = await prisma.client.findMany({
    where: {
      adresId: adres,
    },
    include: {
      records: true,
      adres: true,
    },
  });
  const newData = data.map((item:any) => clientsDto(item));
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
  });
  return newData;
};

export const createRecords = async (data) => {
  try {
    const res = await prisma.record.createMany({ data });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error in :", error);
    return { error: error.message || "An unknown error occurred" };
  }
};

export const createRecords1C = async (data) => {
  try {
    // Проверяем, что все authorId существуют в Client
    const authorIds = data.map((record) => record.authorId);
    const existingClients = await prisma.client.findMany({
      where: { name: { in: authorIds } },
      select: { name: true },
    });
    const existingClientNames = existingClients.map((client) => client.name);

    // Фильтруем только те записи, где authorId существует
    const validData = data.filter((record) =>
      existingClientNames.includes(record.authorId)
    );

    if (validData.length === 0) {
      throw new Error("No valid records with existing authorId found");
    }

    const res = await prisma.record.createMany({ data: validData });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error in createRecords:", error);
    return { error: error.message || "An unknown error occurred" };
  }
};

export const createManyClients = async (data) => {
  try {
    const res = await prisma.client.createMany({ data });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error in tgUsersAnalitik:", error);
    return { error: "Something went wrong" };
  }
};

export const getRecordsByDate = async (selectedDate: string) => {
  const records = await prisma.record.findMany({
    where: {
      date: new Date(selectedDate),
    },
  });

  const result = records.map((record) => ({
    ...record,
    summa: Number(record.summa), // тепер це number, а не Prisma.Decimal
  }));

  return result;
};

export const editeRecordById = async (id, body) => {
  try {
    const res = await prisma.record.update({
      where: {
        id: id,
      },
      data: body,
    });
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const tgUsersAnalitik = async (visitor:iUser) => {
  try {
    const visitorData =
      typeof visitor === "string" ? JSON.parse(visitor) : visitor;

    const user = await prisma.user.upsert({
      where: { telegramId: visitorData.id.toString() },
      update: {},
      create: {
        name: visitorData.first_name,
        telegramId: visitorData.id.toString(),
      },
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in tgUsersAnalitik:", error);
    return { error: "Something went wrong" };
  }
};

export const getUsers = async () => {
  try {
    const res = await prisma.user.findMany({ include: {} });
    const data = res.map((item) => userDto(item));
    return data;
  } catch (error) {
    console.error("Error in geting user:", error);
    return { error: "Something went wrong" };
  }
};

export const getUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: id },
    });

    if (!user) {
      return null;
    }

    return userDto(user);
  } catch (error) {
    console.error("Помилка під час отримання користувача:", error);
    throw new Error("Не вдалося отримати користувача");
  }
};

export const editUserById = async (id, body) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: body,
    });
    return userDto(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
