"use client";
import { Providers } from "../GlobalRedux/provider"
import { Splash } from "../topbar"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <section>
      <Providers>
        <Splash args={["Home"]}/>
        <div className="flex w-screen h-full lg:top-32 items-center justify-center">
          {children}
        </div>
      </Providers>
    </section>
  )
}
