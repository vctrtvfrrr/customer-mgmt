'use client'

import { FormEvent, useState } from 'react'

export default function HomePage() {
  const [name, setName] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    alert(`Olá, ${name}!`)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-lg flex flex-col items-center space-y-5" onSubmit={handleSubmit}>
        <p className="text-4xl">Olá, seja bem-vindo!</p>
        <input
          type="text"
          placeholder="Digite o seu nome:"
          className="w-full border-2 border-neutral-300 px-5 py-3.5 text-2xl leading-7 text-neutral-400 focus:outline-none"
          autoFocus
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-sm bg-[#ec6724] py-3.5 text-2xl font-bold text-white transition-colors hover:bg-orange-600 focus:outline-none"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
