import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save(createProductDto);
    } catch (error) {}
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductSegmentById(id: UUID): Promise<Product> {
    try {
      const segment = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!segment) {
        throw new NotFoundException('Segmento não encontrado...');
      }

      return segment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
