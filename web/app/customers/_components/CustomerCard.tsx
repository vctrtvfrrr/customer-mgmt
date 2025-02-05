import { GoPencil, GoPlus, GoTrash } from 'react-icons/go'
import { Customer } from '../_types/Customer'

export default function CustomerCard({ id, name, salary, companyValue }: Customer) {
  function formatMoney(value: number) {
    const result = (value / 100)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+,)/g, '$1.')

    return `R$ ${result}`
  }

  return (
    <div className="flex flex-col justify-between rounded-sm bg-white p-4 shadow">
      <div className="space-y-2.5 text-center">
        <h3 className="font-bold leading-5">{name}</h3>
        <p className="text-sm leading-4">
          Salário: <span className="whitespace-nowrap">{formatMoney(salary)}</span>
        </p>
        <p className="text-sm leading-4">
          Empresa: <span className="whitespace-nowrap">{formatMoney(companyValue)}</span>
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="hover:text-halloween cursor-pointer transition-colors focus:outline-none"
          title="Selecionar cliente"
        >
          <GoPlus />
        </button>
        <button
          className="hover:text-halloween cursor-pointer transition-colors focus:outline-none"
          title="Editar cliente"
        >
          <GoPencil />
        </button>
        <button
          className="cursor-pointer text-red-500 transition-colors hover:text-red-700 focus:outline-none"
          title="Deletar cliente"
        >
          <GoTrash />
        </button>
      </div>
    </div>
  )
}
