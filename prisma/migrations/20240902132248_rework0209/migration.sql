/*
  Warnings:

  - You are about to drop the column `streetId` on the `Adres` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userId_fkey";

-- AlterTable
ALTER TABLE "Adres" DROP COLUMN "streetId";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
