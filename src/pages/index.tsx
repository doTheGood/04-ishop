import Image from 'next/future/image';
import { HomeContainer, Product, SliderContainer } from '../styles/pages/home';

import { GetStaticProps } from 'next';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import Link from 'next/link';
import Head from 'next/head';
import useEmblaCarousel from 'embla-carousel-react';
import { CartButton } from '../components/CartButton';

interface IHomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: IHomeProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  return (
    <>
      <Head>
        <title>Home | I-shop-04</title>
      </Head>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {products.map((product) => {
                return (
                  <Link
                    key={product.id}
                    href={`product/${product.id}`}
                    prefetch={false}
                  >
                    <Product className="embla__slide">
                      <Image
                        src={product.imageUrl}
                        width={520}
                        height={480}
                        alt=""
                      />
                      <footer>
                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.price}</span>
                        </div>
                        <CartButton color="green" size="large" />
                      </footer>
                    </Product>
                  </Link>
                );
              })}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
