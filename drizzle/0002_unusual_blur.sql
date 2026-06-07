ALTER TABLE "products" ADD COLUMN "product_code" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_code_unique" UNIQUE("product_code");