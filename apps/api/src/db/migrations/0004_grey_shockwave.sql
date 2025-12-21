CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "review" ADD COLUMN "status" "review_status" DEFAULT 'pending' NOT NULL;