-- CreateTable
CREATE TABLE "_MaterialToMediaFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssignmentToMediaFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToMediaFile_AB_unique" ON "_MaterialToMediaFile"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialToMediaFile_B_index" ON "_MaterialToMediaFile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentToMediaFile_AB_unique" ON "_AssignmentToMediaFile"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentToMediaFile_B_index" ON "_AssignmentToMediaFile"("B");

-- AddForeignKey
ALTER TABLE "_MaterialToMediaFile" ADD CONSTRAINT "_MaterialToMediaFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToMediaFile" ADD CONSTRAINT "_MaterialToMediaFile_B_fkey" FOREIGN KEY ("B") REFERENCES "MediaFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToMediaFile" ADD CONSTRAINT "_AssignmentToMediaFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentToMediaFile" ADD CONSTRAINT "_AssignmentToMediaFile_B_fkey" FOREIGN KEY ("B") REFERENCES "MediaFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
