/*
  Warnings:

  - Added the required column `status` to the `Pengajuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengajuan` ADD COLUMN `status` VARCHAR(191) NOT NULL;
