/*
  Warnings:

  - You are about to drop the column `mediaFile_id` on the `StudentAssigment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentAssigment" DROP CONSTRAINT "StudentAssigment_mediaFile_id_fkey";

-- AlterTable
ALTER TABLE "StudentAssigment" DROP COLUMN "mediaFile_id",
ADD COLUMN     "proof_image" TEXT;

-- CreateTable
CREATE TABLE "_MediaFileToStudentAssigment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MediaFileToStudentAssigment_AB_unique" ON "_MediaFileToStudentAssigment"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaFileToStudentAssigment_B_index" ON "_MediaFileToStudentAssigment"("B");

-- AddForeignKey
ALTER TABLE "_MediaFileToStudentAssigment" ADD CONSTRAINT "_MediaFileToStudentAssigment_A_fkey" FOREIGN KEY ("A") REFERENCES "MediaFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaFileToStudentAssigment" ADD CONSTRAINT "_MediaFileToStudentAssigment_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentAssigment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
