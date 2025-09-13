-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "answers" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
