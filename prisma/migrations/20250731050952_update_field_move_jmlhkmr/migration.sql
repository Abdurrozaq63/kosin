/*
  Warnings:

  - You are about to drop the column `jmlh_kamar` on the `kos` table. All the data in the column will be lost.
  - Added the required column `jmlh_kamar` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kos` DROP COLUMN `jmlh_kamar`;

-- AlterTable
ALTER TABLE `tipe_kos` ADD COLUMN `jmlh_kamar` INTEGER NOT NULL;
