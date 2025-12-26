-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laptop` (
    `id_laptop` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `spec_rating` INTEGER NOT NULL,
    `processor` VARCHAR(191) NOT NULL,
    `cpu` VARCHAR(191) NOT NULL,
    `ram` INTEGER NOT NULL,
    `ram_type` VARCHAR(191) NOT NULL,
    `rom` INTEGER NOT NULL,
    `rom_type` VARCHAR(191) NOT NULL,
    `gpu` VARCHAR(191) NOT NULL,
    `display_size` INTEGER NOT NULL,
    `resolution` INTEGER NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_laptop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
