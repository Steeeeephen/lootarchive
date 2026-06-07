import { pgTable, serial, varchar, text, decimal, integer, timestamp, primaryKey, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "@/db/auth-schema";


// ─── Brands ───────────────────────────────────────────────────────────────────

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
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

// ─── Page ─────────────────────────────────────────────────────────────────

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productCode: varchar("product_code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  rarity: varchar("rarity", { length: 50 }).notNull().default("common"),
  // rarity tiers: common | uncommon | rare | epic | legendary
  image: varchar("image", { length: 512 }),
  brandId: integer("brand_id").references(() => brands.id),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // createdBy: integer("created_by").references(() => users.id),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  // updatedBy: integer("updated_by").references(() => users.id)
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

// export const usersRelations = relations(users, ({ many }) => ({
//   orders: many(orders),
// }));

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

