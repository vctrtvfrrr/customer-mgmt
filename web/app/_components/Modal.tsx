'use client'

import { useEffect, useRef } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'

export default function Modal({
  children,
  isOpen,
  closeAction,
}: Readonly<{
  children: React.ReactNode
  isOpen: boolean
  closeAction: () => void
}>) {
  const $backdrop = useRef<HTMLDivElement>(null)
  const $dialog = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const backdrop = $backdrop.current
    const dialog = $dialog.current
    if (dialog === null || backdrop === null) return

    const handleClick = ({ target }: MouseEvent) => {
      if (target === backdrop) closeAction()
    }

    const handleKeyup = ({ key }: KeyboardEvent) =>
      key === 'Escape' && isOpen ? closeAction() : null

    backdrop.addEventListener('click', handleClick)
    document.addEventListener('keyup', handleKeyup)

    return () => {
      backdrop.removeEventListener('click', handleClick)
      document.removeEventListener('keyup', handleKeyup)
    }
  }, [isOpen, closeAction])

  return (
    <div
      ref={$backdrop}
      className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black/30 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        ref={$dialog}
        className="relative mx-auto flex w-full max-w-[25rem] flex-col rounded-sm bg-white bg-clip-border"
      >
        <button
          type="button"
          className="absolute right-4 top-4 cursor-pointer"
          onClick={closeAction}
        >
          <LiaTimesSolid />
        </button>
        {children}
      </div>
    </div>
  )
}
