'use client'

import { useUserStore } from '@/app/_store/useUserStore'
import metadata from '@/config'
import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function CustomersHeader() {
  const { name, setName } = useUserStore()

  useEffect(() => {
    if (name === '') redirect('/')
  }, [name])

  function handleLogout() {
    setName('')
    redirect('/')
  }

  return (
    <header className="w-full bg-white shadow">
      <div className="container flex items-center justify-between py-6">
        <Link href="/">
          <Image src={logo} alt={metadata.title} />
        </Link>
        <nav className="space-x-8">
          <Link
            href="/customers"
            className="hover:text-halloween inline-block leading-5 transition-colors hover:underline"
          >
            Clientes
          </Link>
          <button
            className="hover:text-halloween inline-block cursor-pointer leading-5 transition-colors hover:underline"
            onClick={handleLogout}
          >
            Sair
          </button>
        </nav>
        {name && (
          <div>
            Olá, <strong>{name}</strong>!
          </div>
        )}
      </div>
    </header>
  )
}
