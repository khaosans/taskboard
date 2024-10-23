import dynamic from 'next/dynamic'

const ClientSideComponent = dynamic(
  () => import('./Web3SignIn'),
  { ssr: false }
)

export default ClientSideComponent
