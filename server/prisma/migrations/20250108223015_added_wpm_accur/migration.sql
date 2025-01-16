/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accuracy` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wpm` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "imageUrl",
DROP COLUMN "score",
ADD COLUMN     "accuracy" INTEGER NOT NULL,
ADD COLUMN     "wpm" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");
