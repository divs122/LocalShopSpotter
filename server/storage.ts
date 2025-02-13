import { Store, Product, InsertStore, InsertProduct, StoreWithProducts } from "@shared/schema";

export interface IStorage {
  getStores(): Promise<Store[]>;
  getStore(id: number): Promise<StoreWithProducts | undefined>;
  getProducts(): Promise<Product[]>;
  getProductsByStore(storeId: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createStore(store: InsertStore): Promise<Store>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private stores: Map<number, Store>;
  private products: Map<number, Product>;
  private currentStoreId: number;
  private currentProductId: number;

  constructor() {
    this.stores = new Map();
    this.products = new Map();
    this.currentStoreId = 1;
    this.currentProductId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    const storeData: InsertStore[] = [
      {
        name: "Downtown Electronics",
        description: "Your one-stop shop for electronics",
        address: "123 Main St",
        latitude: "40.7128",
        longitude: "-74.0060",
        image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d",
        category: "Electronics"
      },
      {
        name: "Fashion Forward",
        description: "Trendy fashion boutique",
        address: "456 Style Ave",
        latitude: "40.7138",
        longitude: "-74.0070",
        image: "https://images.unsplash.com/photo-1531150677150-362c74533d21",
        category: "Fashion"
      }
    ];

    storeData.forEach(store => this.createStore(store));

    const productData: InsertProduct[] = [
      {
        name: "Wireless Headphones",
        description: "Premium sound quality",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        price: "99.99",
        storeId: 1,
        inventory: 10
      },
      {
        name: "Smart Watch",
        description: "Track your fitness",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        price: "199.99",
        storeId: 1,
        inventory: 5
      }
    ];

    productData.forEach(product => this.createProduct(product));
  }

  async getStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async getStore(id: number): Promise<StoreWithProducts | undefined> {
    const store = this.stores.get(id);
    if (!store) return undefined;

    const products = Array.from(this.products.values()).filter(
      p => p.storeId === id
    );

    return { ...store, products };
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByStore(storeId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.storeId === storeId
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createStore(store: InsertStore): Promise<Store> {
    const id = this.currentStoreId++;
    const newStore = { ...store, id };
    this.stores.set(id, newStore);
    return newStore;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }
}

export const storage = new MemStorage();
