/*
  Warnings:

  - You are about to drop the column `ram_type` on the `laptop` table. All the data in the column will be lost.
  - You are about to drop the column `rom_type` on the `laptop` table. All the data in the column will be lost.
  - You are about to drop the column `spec_rating` on the `laptop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laptop` DROP COLUMN `ram_type`,
    DROP COLUMN `rom_type`,
    DROP COLUMN `spec_rating`;
