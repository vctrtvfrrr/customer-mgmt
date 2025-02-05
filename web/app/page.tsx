'use client'

import { redirect } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { useUserStore } from './_store/useUserStore'

export default function HomePage() {
  const [formName, setFormName] = useState('')
  const { name, setName } = useUserStore()

  useEffect(() => {
    if (name !== '') redirect('/customers')
  }, [name])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (formName === '') return
    setName(formName)
    redirect('/customers')
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-lg flex flex-col items-center space-y-5" onSubmit={handleSubmit}>
        <p className="text-4xl">Olá, seja bem-vindo!</p>
        <input
          type="text"
          placeholder="Digite o seu nome:"
          className="w-full border-2 border-neutral-300 px-5 py-3.5 text-2xl leading-7 text-neutral-400 focus:outline-none"
          onChange={(e) => setFormName(e.target.value)}
          autoFocus
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
