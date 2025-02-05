'use client'

import CustomerCard from './_components/CustomerCard'

export default function CustomersPage() {
  return (
    <main className="container my-8">
      <div className="mb-2.5 flex justify-between">
        <h2 className="text-lg leading-6">
          <strong>16</strong> clientes encontrados:
        </h2>

        <div className="flex">
          <p className="text-lg leading-6">Clientes por página:</p>
          <select className="leading-3.5 ml-2 rounded-sm border border-gray-300 text-xs focus:outline-none">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(10)].map((customer, index) => (
          <CustomerCard key={index} {...customer} />
        ))}
      </div>

      <button className="border-halloween text-halloween hover:border-halloween-dark hover:text-halloween-dark mt-5 w-full cursor-pointer rounded-sm border-2 p-2.5 text-sm font-bold leading-4 focus:outline-none">
        Criar cliente
      </button>
    </main>
  )
}
