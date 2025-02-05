import { remove } from '../_actions/customers';

export default function DeleteModal({
  customerId,
  customerName,
  closeAction,
}: Readonly<{ customerId: number; customerName: string; closeAction: () => Promise<void> }>) {
  async function handleDelete() {
    await remove(customerId)
    await closeAction()
  }

  return (
    <div className="flex flex-col p-5">
      <h3 className="mb-4 font-bold leading-5">Excluir cliente:</h3>
      <p>
        Você está prestes a excluir o cliente: <strong>{customerName}</strong>
      </p>
      <button
        className="bg-halloween hover:bg-halloween-dark mt-4 w-full cursor-pointer rounded-sm py-3 text-sm font-bold leading-4 text-white transition-colors focus:outline-none"
        onClick={handleDelete}
      >
        Excluir cliente
      </button>
    </div>
  )
}
