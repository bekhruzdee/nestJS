import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(@Body() product: { name: string; price: number }) {
    return this.productService.addProduct(product);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: { name?: string; price?: number },
  ) {
    return this.productService.updateProduct(Number(id), updateProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const deleteProduct = this.productService.deleteProduct(Number(id));

    if (deleteProduct) {
      return deleteProduct;
    } else {
      return {
        message: 'Product Not Found ⚠️',
      };
    }
  }
}
