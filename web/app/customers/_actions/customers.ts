'use server'

import API from '@/app/_libs/api'

export async function count(): Promise<{ total: number }> {
  return await API.get('customers/count')
}
