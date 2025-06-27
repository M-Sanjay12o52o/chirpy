ALTER TABLE "chirps" DROP CONSTRAINT "chirps_body_unique";--> statement-breakpoint
ALTER TABLE "chirps" ALTER COLUMN "body" SET DATA TYPE varchar(140);