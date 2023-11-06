import { Providers } from "../GlobalRedux/provider"
import { Splash } from "../topbar"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
      <Providers>
        {
          children
        }
      </Providers>
  )
}
