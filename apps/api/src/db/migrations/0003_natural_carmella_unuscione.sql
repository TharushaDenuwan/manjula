CREATE TABLE "order" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"description" text,
	"price" varchar(100),
	"quantity" integer,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"contact_no" varchar(255) NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
