-- CreateTable
CREATE TABLE `Pengajuan` (
    `id_pengajuan` VARCHAR(191) NOT NULL,
    `nama_kos` VARCHAR(191) NOT NULL,
    `notelp` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_pengajuan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
