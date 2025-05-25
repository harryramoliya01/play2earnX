'use client'

import * as React from 'react'
import {GetSiweMessageOptions, RainbowKitSiweNextAuthProvider} from 'rainbowkit-ui-siwe-next-auth'
import {RainbowKitProvider, darkTheme} from 'rainbowkit-ui'
import {SessionProvider} from 'next-auth/react'
import {Session} from 'next-auth'
import {WagmiProvider} from "wagmi";
import {config} from "@/services/wagmi";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const demoAppInfo = {
  appName: 'Dapp Funds dApp',
}

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: `Once you're signed in, you'll be able to access all of our dApp's features.Thank you for partnering with CrowdFunding!`,
})

export function Providers({ children, pageProps }: {
  children: React.ReactNode
  pageProps: {
    session: Session
  }
}) {
  const [mounted, setMounted] = React.useState(false)
  const [authEnabled, setAuthEnabled] = React.useState(pageProps.session !== null);
  React.useEffect(() => setMounted(true), [])
  const queryClient = new QueryClient();

  return (
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider enabled={authEnabled} getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider theme={darkTheme()} appInfo={demoAppInfo}>
                {mounted && children}
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </SessionProvider>
  )
}
