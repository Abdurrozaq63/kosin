/*
  Warnings:

  - Added the required column `kmr_terisi` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tipe_kos` ADD COLUMN `kmr_terisi` INTEGER NOT NULL;
