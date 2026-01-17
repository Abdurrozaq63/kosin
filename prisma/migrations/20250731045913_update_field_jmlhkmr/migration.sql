/*
  Warnings:

  - Added the required column `jmlh_kamar` to the `Kos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kos` ADD COLUMN `jmlh_kamar` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipe_kos` ADD COLUMN `status` VARCHAR(191) NOT NULL;
