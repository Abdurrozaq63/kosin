/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `cpu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laptop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vga` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id_user` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nama` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `id_user` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_user`);

-- DropTable
DROP TABLE `cpu`;

-- DropTable
DROP TABLE `laptop`;

-- DropTable
DROP TABLE `vga`;

-- CreateTable
CREATE TABLE `Admin` (
    `id_admin` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kos` (
    `id_kos` VARCHAR(191) NOT NULL,
    `nama_kos` VARCHAR(191) NOT NULL,
    `notelp` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_kos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipe_kos` (
    `id_tipe` VARCHAR(191) NOT NULL,
    `id_kos` VARCHAR(191) NOT NULL,
    `nama_tipe` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `jarak` INTEGER NOT NULL,
    `fasilitas` VARCHAR(191) NOT NULL,
    `kamar_mandi` VARCHAR(191) NOT NULL,
    `parkir` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_tipe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Riwayat_preferensi` (
    `id_preferensi` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `jarak` INTEGER NOT NULL,
    `fasilitas` VARCHAR(191) NOT NULL,
    `kamar_mandi` VARCHAR(191) NOT NULL,
    `parkir` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_preferensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Riwayat_user` (
    `id_riwayat` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_tipe` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_riwayat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Simpan` (
    `id_simpan` VARCHAR(191) NOT NULL,
    `id_kos` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_simpan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
