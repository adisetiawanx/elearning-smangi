/*
  Warnings:

  - You are about to drop the column `class_name` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `class_name` on the `Material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_class_name_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_class_name_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "class_name",
ADD COLUMN     "class_id" TEXT;

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "class_name",
ADD COLUMN     "class_id" TEXT;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
