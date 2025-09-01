import { z } from "zod";

export const clientSchema = z.object({
  clientName: z.string().min(2, "Введіть ім'я"),
  op: z.string().optional(),
  adresId: z.string().min(1, "Виберіть село"),
  streetId: z.string().min(1, "Виберіть вулицю"),
  house: z.string().min(1, "Вкажіть будинок"),
  tel: z.string().min(5, "Вкажіть телефон"),
  tarif: z.string().min(1, "Виберіть тариф"),
  isUsilok: z.boolean(),
  isClosed: z.boolean(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
