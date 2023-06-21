import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { PaginationService } from './../pagination/pagination.service';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto';
import { ProductDto } from './dto/product.dto';
import { returnProductObject, returnProductObjectFull } from './product.object';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAllProducts(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: 'asc' });
    else if (sort === EnumProductSort.HIGH_PRICE)
      prismaSort.push({ price: 'desc' });
    else if (sort === EnumProductSort.OLDEST)
      prismaSort.push({ createdAt: 'asc' });
    else prismaSort.push({ createdAt: 'desc' });

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              }
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter
      })
    };
  }

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: returnProductObjectFull
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: returnProductObjectFull
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: returnProductObjectFull
    });

    if (!products) {
      throw new NotFoundException('Products not found.');
    }

    return products;
  }

  async getSimilar(id: number) {
    const currentProduct = await this.byId(id);

    if (!currentProduct) {
      throw new NotFoundException('Current product not found.');
    }

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name
        },
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: returnProductObject
    });

    if (!products) {
      throw new NotFoundException('Products not found.');
    }

    return products;
  }

  async createProduct() {
    const product = await this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        description: '',
        price: 0
      }
    });
    return product.id;
  }

  async updateProduct(id: number, dto: ProductDto) {
    const { name, price, description, images, categoryId } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        slug: generateSlug(name),
        price,
        description,
        images,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id }
    });
  }
}
