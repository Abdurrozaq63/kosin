/*
  Warnings:

  - You are about to drop the column `fasilitas` on the `tipe_kos` table. All the data in the column will be lost.
  - You are about to drop the column `kamar_mandi` on the `tipe_kos` table. All the data in the column will be lost.
  - You are about to drop the column `nama_tipe` on the `tipe_kos` table. All the data in the column will be lost.
  - You are about to drop the column `parkir` on the `tipe_kos` table. All the data in the column will be lost.
  - Added the required column `fasilitas_kamar` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fasilitas_umum` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_malam` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kos` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keamanan` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luas_kamar` to the `Tipe_kos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tipe_kos` DROP COLUMN `fasilitas`,
    DROP COLUMN `kamar_mandi`,
    DROP COLUMN `nama_tipe`,
    DROP COLUMN `parkir`,
    ADD COLUMN `fasilitas_kamar` VARCHAR(191) NOT NULL,
    ADD COLUMN `fasilitas_umum` VARCHAR(191) NOT NULL,
    ADD COLUMN `jam_malam` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenis_kos` VARCHAR(191) NOT NULL,
    ADD COLUMN `keamanan` VARCHAR(191) NOT NULL,
    ADD COLUMN `luas_kamar` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `nama` VARCHAR(191) NULL;
