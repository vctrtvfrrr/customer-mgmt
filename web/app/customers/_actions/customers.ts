'use server'

import API from '@/app/_libs/api'
import { Customer } from '../_types/Customer'

export async function count(): Promise<{ total: number }> {
  return await API.get('customers/count')
}

export async function fetchAll(pageNumber: number = 1, pageSize: number = 10): Promise<Customer[]> {
  return await API.get('customers', { pageNumber, pageSize })
}
