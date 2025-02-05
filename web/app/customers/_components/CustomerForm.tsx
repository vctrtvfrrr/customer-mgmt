import formatMoney from '@/app/_libs/formatMoney'
import { FormEvent, useState } from 'react'
import { create, update } from '../_actions/customers'
import { Customer } from '../_types/Customer'

export default function CustomerForm({
  customer,
  closeAction,
}: Readonly<{
  customer?: Customer
  closeAction: () => Promise<void>
}>) {
  const originalFormData = {
    name: customer?.name || '',
    salary: formatMoney(customer?.salary || 0),
    companyValue: formatMoney(customer?.companyValue || 0),
  }

  const [formData, setFormData] = useState(originalFormData)

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!formData.name || !formData.salary || !formData.companyValue) return

    const payload = {
      name: formData.name,
      salary: parseInt(formData.salary.replace(/\D/g, '')),
      companyValue: parseInt(formData.companyValue.replace(/\D/g, '')),
    }

    try {
      if (!customer?.id) {
        await create(payload)
      } else {
        await update(customer.id, payload)
      }

      await closeAction()
    } catch (error) {
      if (error instanceof Error) alert(error.message)
      setFormData(originalFormData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col p-5">
        <h3 className="mb-4 font-bold leading-5">
          {customer ? 'Editando Cliente' : 'Criar cliente:'}
        </h3>
        <div className="flex flex-col space-y-2.5">
          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o nome:"
            onChange={handleChange}
          />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o salário:"
            onChange={handleChange}
          />
          <input
            type="text"
            name="companyValue"
            value={formData.companyValue}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o valor da empresa:"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-halloween hover:bg-halloween-dark mt-4 w-full cursor-pointer rounded-sm py-3 text-sm font-bold leading-4 text-white transition-colors focus:outline-none"
        >
          {customer ? 'Editar cliente' : 'Criar cliente'}
        </button>
      </div>
    </form>
  )
}
