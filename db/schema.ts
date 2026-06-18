import {
  pgTable,
  serial,
  varchar,
  text,
  decimal,
  integer,
  timestamp,
  primaryKey,
  boolean,
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "@/db/auth-schema";

export const rarityEnum = pgEnum("rarity", ["common","uncommon","rare","epic","legendary","mythic"]);

// ─── Brands ───────────────────────────────────────────────────────────────────

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  logo: varchar("logo", { length: 512}),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),

});

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  parentId: integer("parent_id"), // null = top-level category
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categoryHierarchy",
  }),
  children: many(categories, { relationName: "categoryHierarchy" }),
  productCategories: many(productCategories),
}));


export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productCode: varchar("product_code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  rarity: rarityEnum("rarity").notNull().default("common"),
  image: varchar("image", { length: 512 }),
  brandId: integer("brand_id").references(() => brands.id, { onDelete: "restrict" }).notNull(),  isActive: boolean("is_active").notNull().default(false),
  metaTitle: varchar("meta_title", { length: 60 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  metaKeywords: varchar("meta_keywords", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),

});


export const traits = pgTable("traits", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  color: varchar("color", { length: 7 }),  // hex color
  cssClass: varchar("css_class", { length: 255 }),
  icon: varchar("icon", { length: 255 }),  // nullable for now
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  productCategories: many(productCategories),
  orderItems: many(orderItems),
}));

// ─── Product ↔ Category (join table) ─────────────────────────────────────────

export const productCategories = pgTable(
  "product_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.categoryId] }),
  })
);

export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
  product: one(products, {
    fields: [productCategories.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [productCategories.categoryId],
    references: [categories.id],
  }),
}));


export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id",{ length: 255}),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  // statuses: pending | paid | cancelled
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
  orderItems: many(orderItems),
}));


export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  // unitPrice is snapshot of price at time of purchase
});

export const shippingProfiles = pgTable("shipping_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  streetAddress: varchar("street_address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});



export const shippingProfilesRelations = relations(shippingProfiles, ({ one }) => ({
  user: one(user, {
    fields: [shippingProfiles.userId],
    references: [user.id],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

