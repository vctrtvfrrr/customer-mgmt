import CustomersHeader from './header'

export default function CustomersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <CustomersHeader />

      {children}
    </>
  )
}
