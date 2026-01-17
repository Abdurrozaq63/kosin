/*
  Warnings:

  - You are about to drop the column `fasilitas` on the `riwayat_preferensi` table. All the data in the column will be lost.
  - You are about to drop the column `kamar_mandi` on the `riwayat_preferensi` table. All the data in the column will be lost.
  - You are about to drop the column `parkir` on the `riwayat_preferensi` table. All the data in the column will be lost.
  - Added the required column `fasilitas_kamar` to the `Riwayat_preferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fasilitas_umum` to the `Riwayat_preferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kos` to the `Riwayat_preferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keamanan` to the `Riwayat_preferensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luas_kamar` to the `Riwayat_preferensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `riwayat_preferensi` DROP COLUMN `fasilitas`,
    DROP COLUMN `kamar_mandi`,
    DROP COLUMN `parkir`,
    ADD COLUMN `fasilitas_kamar` VARCHAR(191) NOT NULL,
    ADD COLUMN `fasilitas_umum` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenis_kos` VARCHAR(191) NOT NULL,
    ADD COLUMN `keamanan` VARCHAR(191) NOT NULL,
    ADD COLUMN `luas_kamar` INTEGER NOT NULL;
