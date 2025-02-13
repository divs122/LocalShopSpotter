import { pgTable, text, serial, numeric, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  price: numeric("price").notNull(),
  storeId: integer("store_id").notNull(),
  inventory: integer("inventory").notNull(),
});

export const insertStoreSchema = createInsertSchema(stores).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type Store = typeof stores.$inferSelect;
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export interface StoreWithProducts extends Store {
  products: Product[];
}
