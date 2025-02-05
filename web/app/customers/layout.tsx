import CustomersHeader from './_components/Header'

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
