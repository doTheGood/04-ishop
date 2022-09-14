import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { AppProps } from 'next/app'
import Image from 'next/future/image'
import { Container, Header } from '../styles/pages/app'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
