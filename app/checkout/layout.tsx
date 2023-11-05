import { Providers } from "../GlobalRedux/provider"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <html lang="en">
      <Providers>
        {
          children
        }
      </Providers>
    </html>
  )
}
