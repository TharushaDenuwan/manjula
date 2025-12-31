ALTER TABLE "bookings" RENAME TO "calendar";--> statement-breakpoint
ALTER TABLE "calendar" DROP CONSTRAINT "bookings_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;