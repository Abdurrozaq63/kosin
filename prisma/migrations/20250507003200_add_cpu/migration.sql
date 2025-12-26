-- CreateTable
CREATE TABLE `Cpu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpu_name` VARCHAR(191) NOT NULL,
    `rate` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
