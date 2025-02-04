import { NotFoundException } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm';
import { Customer } from './customer.entity';

describe('CustomersController', () => {
  let controller: CustomersController;

  const mockCustomer = {
    id: 1,
    name: 'Customer',
    salary: 1000000,
    companyValue: 30000000,
  };

  const mockCustomersService = {
    findAll: jest.fn().mockResolvedValue([mockCustomer]),
    findOne: jest.fn().mockImplementation((id: number) => {
      if (id === 1) return Promise.resolve(mockCustomer);
      throw new EntityNotFoundError(Customer, 'Customer not found');
    }),
    create: jest
      .fn()
      .mockImplementation((dto: CreateCustomerDto) =>
        Promise.resolve({ id: 2, ...dto }),
      ),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: UpdateCustomerDto) =>
        Promise.resolve({ id, ...dto }),
      ),
    remove: jest.fn().mockImplementation((id: number) => {
      if (id !== 1)
        throw new EntityNotFoundError(Customer, 'Customer not found');
      return Promise.resolve({ deleted: true });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        { provide: CustomersService, useValue: mockCustomersService },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all customers', async () => {
    expect(await controller.findAll()).toEqual([mockCustomer]);
  });

  it('should return a single customer', async () => {
    expect(await controller.findOne(1)).toEqual(mockCustomer);
  });

  it('should throw an error if customer is not found', async () => {
    await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
  });

  it('should create a customer', async () => {
    const dto: CreateCustomerDto = {
      name: 'Create Customer',
      salary: 1000000,
      companyValue: 30000000,
    };
    expect(await controller.create(dto)).toEqual({ id: 2, ...dto });
  });

  it('should update a customer', async () => {
    const dto: UpdateCustomerDto = {
      name: 'Update Customer',
      salary: 2000000,
      companyValue: 50000000,
    };
    expect(await controller.update(1, dto)).toEqual({ id: 1, ...dto });
  });

  it('should delete a customer', async () => {
    expect(await controller.remove(1)).toBeUndefined();
  });

  it('should throw an error if customer to delete is not found', async () => {
    await expect(controller.remove(2)).rejects.toThrow(NotFoundException);
  });
});
