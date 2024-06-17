-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(10) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "password_hash" CHAR(80) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" VARCHAR(10) NOT NULL,
    "userId" VARCHAR(10) NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" VARCHAR(10) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" VARCHAR(512),
    "video_id" VARCHAR(32) NOT NULL,
    "bpm" SMALLINT,
    "video_speed" DECIMAL(2,2),
    "password" VARCHAR(16),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ,
    "user_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_invites" (
    "id" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" VARCHAR(10) NOT NULL,
    "user_id" VARCHAR(10),

    CONSTRAINT "project_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loops" (
    "id" VARCHAR(10) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" VARCHAR(512),
    "from_time_ms" INTEGER,
    "to_time_ms" INTEGER,
    "bpm" SMALLINT,
    "project_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "loops_pkey" PRIMARY KEY ("project_id","id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_invites_user_id_project_id_key" ON "project_invites"("user_id", "project_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_invites" ADD CONSTRAINT "project_invites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_invites" ADD CONSTRAINT "project_invites_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loops" ADD CONSTRAINT "loops_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
