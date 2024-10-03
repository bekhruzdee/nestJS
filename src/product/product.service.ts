import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  private products: Product[] = [];

  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      id: Math.floor(Math.random() * 1000),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  updateProduct(id: number, updateProduct: { name?: string; price?: number }) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found⚠️');
    }

    const existingProduct = this.products[productIndex];
    const updatedProduct = {
      ...existingProduct,
      ...updateProduct,
    };

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return null;
    }

    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    return deletedProduct;
  }
}
