-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NodeToNode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NodeToNode_AB_unique" ON "_NodeToNode"("A", "B");

-- CreateIndex
CREATE INDEX "_NodeToNode_B_index" ON "_NodeToNode"("B");

-- AddForeignKey
ALTER TABLE "_NodeToNode" ADD CONSTRAINT "_NodeToNode_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodeToNode" ADD CONSTRAINT "_NodeToNode_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
