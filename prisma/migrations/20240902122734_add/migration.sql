-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'GUEST');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "telegram_id" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" DEFAULT 'GUEST',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bill" TEXT,
    "street" TEXT,
    "home" INTEGER,
    "phone" BIGINT,
    "taryf_name" TEXT,
    "isUsilok" BOOLEAN NOT NULL DEFAULT false,
    "isNoActive" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "adresId" TEXT,
    "taryfId" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streetId" TEXT,

    CONSTRAINT "Adres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Street" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "streetId" TEXT,

    CONSTRAINT "Street_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taryf" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summa" INTEGER NOT NULL,

    CONSTRAINT "Taryf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "summa" DECIMAL(65,30),
    "description" TEXT,
    "authorId" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_name_key" ON "clients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Adres_name_key" ON "Adres"("name");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_adresId_fkey" FOREIGN KEY ("adresId") REFERENCES "Adres"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_taryfId_fkey" FOREIGN KEY ("taryfId") REFERENCES "Taryf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Street" ADD CONSTRAINT "Street_streetId_fkey" FOREIGN KEY ("streetId") REFERENCES "Adres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "clients"("name") ON DELETE SET NULL ON UPDATE CASCADE;
