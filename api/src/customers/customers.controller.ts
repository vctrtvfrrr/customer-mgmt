import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { EntityNotFoundError } from 'typeorm';
import { FindAllQueryDto } from './dtos/find-all-query.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('count')
  async count() {
    try {
      const total = await this.customersService.count();
      return { total };
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) params: FindAllQueryDto,
  ) {
    const pageNumber = params?.pageNumber ? params.pageNumber : 1;
    const pageSize = params?.pageSize ? params.pageSize : 10;

    try {
      return await this.customersService.findAll(
        pageSize,
        pageSize * (pageNumber - 1),
      );
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.customersService.findOne(id);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customersService.create(createCustomerDto);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      return await this.customersService.update(id, updateCustomerDto);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    try {
      await this.customersService.remove(id);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException(error.message);
    }
  }
}
