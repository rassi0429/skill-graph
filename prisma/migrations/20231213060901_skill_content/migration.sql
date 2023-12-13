/*
  Warnings:

  - You are about to drop the `TestTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NodeToNode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NodeToNode" DROP CONSTRAINT "_NodeToNode_A_fkey";

-- DropForeignKey
ALTER TABLE "_NodeToNode" DROP CONSTRAINT "_NodeToNode_B_fkey";

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "content" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "TestTable";

-- DropTable
DROP TABLE "_NodeToNode";

-- CreateTable
CREATE TABLE "_SkillToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToSkill_AB_unique" ON "_SkillToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToSkill_B_index" ON "_SkillToSkill"("B");

-- AddForeignKey
ALTER TABLE "_SkillToSkill" ADD CONSTRAINT "_SkillToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToSkill" ADD CONSTRAINT "_SkillToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
