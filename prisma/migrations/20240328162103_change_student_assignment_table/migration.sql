-- AlterTable
ALTER TABLE "StudentAssigment" ADD COLUMN     "description" TEXT,
ADD COLUMN     "mediaFile_id" TEXT,
ALTER COLUMN "grade" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentAssigment" ADD CONSTRAINT "StudentAssigment_mediaFile_id_fkey" FOREIGN KEY ("mediaFile_id") REFERENCES "MediaFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
