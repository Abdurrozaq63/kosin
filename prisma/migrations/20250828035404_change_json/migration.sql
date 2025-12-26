/*
  Warnings:

  - You are about to drop the column `status` on the `tipe_kos` table. All the data in the column will be lost.
  - You are about to alter the column `fasilitas_kamar` on the `tipe_kos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `fasilitas_umum` on the `tipe_kos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `keamanan` on the `tipe_kos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `tipe_kos` DROP COLUMN `status`,
    MODIFY `fasilitas_kamar` JSON NOT NULL,
    MODIFY `fasilitas_umum` JSON NOT NULL,
    MODIFY `keamanan` JSON NOT NULL;
