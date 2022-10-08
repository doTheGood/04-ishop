import { globalStyles } from '../styles/global';
import { AppProps } from 'next/app';
import { Container } from '../styles/pages/app';
import { Header } from '../components/Header';
import { CartContextProvider } from '../contexts/CartContext';

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}

export default MyApp;
