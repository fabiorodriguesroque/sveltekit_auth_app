/*
  Warnings:

  - You are about to drop the column `refres_token` on the `user` table. All the data in the column will be lost.
  - Added the required column `refresh_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `refres_token`,
    ADD COLUMN `refresh_token` VARCHAR(191) NOT NULL;
