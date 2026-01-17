/*
  Warnings:

  - You are about to drop the column `cpu` on the `laptop` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `laptop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laptop` DROP COLUMN `cpu`,
    DROP COLUMN `resolution`;
