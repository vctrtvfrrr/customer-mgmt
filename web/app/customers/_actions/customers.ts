'use server'

import API from '@/app/_libs/api'
import { Customer } from '../_types/Customer'

export async function count(): Promise<{ total: number }> {
  return await API.get('customers/count')
}

export async function fetchAll(pageNumber: number = 1, pageSize: number = 10): Promise<Customer[]> {
  return await API.get('customers', { pageNumber, pageSize })
}

export async function create(customer: Partial<Customer>): Promise<Customer> {
  return await API.post('customers', customer)
}

export async function update(id: number, customer: Partial<Customer>): Promise<Customer> {
  return await API.patch(`customers/${id}`, customer)
}

export async function remove(id: number): Promise<void> {
  return await API.delete(`customers/${id}`)
}
