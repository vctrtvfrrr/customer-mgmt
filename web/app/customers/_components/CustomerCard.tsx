import { GoPencil, GoPlus, GoTrash } from 'react-icons/go'

export default function CustomerCard() {
  return (
    <div className="flex flex-col justify-between rounded-sm bg-white p-4 shadow">
      <div className="space-y-2.5 text-center">
        <h3 className="font-bold leading-5">Nome do Cliente</h3>
        <p className="text-sm leading-4">
          Salário: <span className="whitespace-nowrap">R$ 10.000,00</span>
        </p>
        <p className="text-sm leading-4">
          Empresa: <span className="whitespace-nowrap">R$ 100.000,00</span>
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
