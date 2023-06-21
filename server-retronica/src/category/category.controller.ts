import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // get all categories
  @Get()
  async getAll() {
    return this.categoryService.getAllCategories();
  }

  // get categories by id
  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.categoryService.byId(+id);
  }

  // get categories by slug
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug);
  }

  // create category
  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.categoryService.createCategory();
  }

  // update category
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') categoryId: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(+categoryId, dto);
  }

  // delete category
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.deleteCategory(+categoryId);
  }
}
