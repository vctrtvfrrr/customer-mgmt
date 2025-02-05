import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  count(): Promise<number> {
    return this.customersRepository.count();
  }

  findAll(take: number = 10, skip: number = 0): Promise<Customer[]> {
    return this.customersRepository.find({ take, skip });
  }

  findOne(id: number): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ id });
  }

  async create(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customersRepository.create(data);
    return this.customersRepository.save(customer);
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    await this.customersRepository.update(id, data);
    return this.customersRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
