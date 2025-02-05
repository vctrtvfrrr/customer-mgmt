import { FormEvent } from 'react'
import { Customer } from '../_types/Customer'

export default function CustomerForm({
  customer,
  closeAction,
}: Readonly<{
  customer?: Customer
  closeAction: () => void
}>) {
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
            defaultValue={customer?.name}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o nome:"
          />
          <input
            type="text"
            defaultValue={customer?.salary}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o salário:"
          />
          <input
            type="text"
            defaultValue={customer?.companyValue}
            className="w-full rounded-sm border-2 border-neutral-300 p-2 focus:outline-none"
            placeholder="Digite o valor da empresa:"
          />
        </div>
        <button
          type="submit"
          className="bg-halloween hover:bg-halloween-dark mt-4 w-full cursor-pointer rounded-sm py-3 text-sm font-bold leading-4 text-white transition-colors focus:outline-none"
        >
          Criar cliente
        </button>
      </div>
    </form>
  )
}
