/*
  Warnings:

  - You are about to drop the column `id_kos` on the `simpan` table. All the data in the column will be lost.
  - Added the required column `id_tipe` to the `Simpan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `simpan` DROP COLUMN `id_kos`,
    ADD COLUMN `id_tipe` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Tipe_kos` ADD CONSTRAINT `Tipe_kos_id_kos_fkey` FOREIGN KEY (`id_kos`) REFERENCES `Kos`(`id_kos`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayat_preferensi` ADD CONSTRAINT `Riwayat_preferensi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayat_user` ADD CONSTRAINT `Riwayat_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayat_user` ADD CONSTRAINT `Riwayat_user_id_tipe_fkey` FOREIGN KEY (`id_tipe`) REFERENCES `Tipe_kos`(`id_tipe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Simpan` ADD CONSTRAINT `Simpan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Simpan` ADD CONSTRAINT `Simpan_id_tipe_fkey` FOREIGN KEY (`id_tipe`) REFERENCES `Tipe_kos`(`id_tipe`) ON DELETE CASCADE ON UPDATE CASCADE;
