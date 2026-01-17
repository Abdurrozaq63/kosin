/*
  Warnings:

  - You are about to alter the column `harga` on the `tipe_kos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `tipe_kos` MODIFY `harga` INTEGER NOT NULL,
    MODIFY `luas_kamar` VARCHAR(191) NOT NULL;
