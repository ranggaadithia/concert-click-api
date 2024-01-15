/*
  Warnings:

  - You are about to drop the column `date_end` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `date_start` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location_name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location_url` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `time_end` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `time_start` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `date_end`,
    DROP COLUMN `date_start`,
    DROP COLUMN `location_name`,
    DROP COLUMN `location_url`,
    DROP COLUMN `time_end`,
    DROP COLUMN `time_start`,
    ADD COLUMN `artists` VARCHAR(191) NULL,
    ADD COLUMN `dateEnd` DATETIME(3) NULL,
    ADD COLUMN `dateStart` DATETIME(3) NULL,
    ADD COLUMN `locationName` VARCHAR(191) NULL,
    ADD COLUMN `locationUrl` VARCHAR(191) NULL,
    ADD COLUMN `timeEnd` DATETIME(3) NULL,
    ADD COLUMN `timeStart` DATETIME(3) NULL;
