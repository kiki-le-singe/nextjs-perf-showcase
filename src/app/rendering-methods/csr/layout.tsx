import { ClientQueryProvider } from '@/lib/query-client-provider'

export default function CSRLayout({ children }: { children: React.ReactNode }) {
  return <ClientQueryProvider>{children}</ClientQueryProvider>
}
