/*
  Warnings:

  - Added the required column `nama_tipe` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tipe_kos` ADD COLUMN `nama_tipe` VARCHAR(191) NOT NULL;
