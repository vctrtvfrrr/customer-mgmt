import formatMoney from '@/app/_libs/formatMoney'
import { FormEvent, useState } from 'react'
import { Customer } from '../_types/Customer'

export default function CustomerForm({
  customer,
  closeAction,
}: Readonly<{
  customer?: Customer
  closeAction: () => void
}>) {
  const [formData, setFormData] = useState<Customer | undefined>(customer)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value } as Customer)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    closeAction()
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
            value={customer?.name}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o nome:"
            onChange={handleChange}
          />
          <input
            type="text"
            value={customer?.salary && formatMoney(customer.salary)}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o salário:"
            onChange={handleChange}
          />
          <input
            type="text"
            value={customer?.companyValue && formatMoney(customer.companyValue)}
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
