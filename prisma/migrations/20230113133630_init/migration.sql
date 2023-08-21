/*
  Warnings:

  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WishlistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Party` DROP FOREIGN KEY `Party_party_leader_id_fkey`;

-- DropForeignKey
ALTER TABLE `Person` DROP FOREIGN KEY `Person_assigned_person_id_fkey`;

-- DropForeignKey
ALTER TABLE `Person` DROP FOREIGN KEY `Person_party_id_fkey`;

-- DropForeignKey
ALTER TABLE `WishlistItem` DROP FOREIGN KEY `WishlistItem_person_id_fkey`;

-- DropTable
DROP TABLE `Party`;

-- DropTable
DROP TABLE `Person`;

-- DropTable
DROP TABLE `WishlistItem`;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
