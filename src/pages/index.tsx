import Image from 'next/future/image';
import { HomeContainer, Product, SliderContainer } from '../styles/pages/home';

import { GetStaticProps } from 'next';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import Link from 'next/link';
import Head from 'next/head';
import useEmblaCarousel from 'embla-carousel-react';
import { CartButton } from '../components/CartButton';
import { IProduct } from '../contexts/CartContext';
import { useCart } from '../hooks/useCarts';
import { MouseEvent, useEffect, useState } from 'react';
import { ProductSkeleton } from '../components/ProductSkeleton';

interface IHomeProps {
  products: IProduct[];
}

export default function Home({ products }: IHomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  useEffect(() => {
    //fake loading to use the skeleton loading from figma
    const timeOut = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  const { addToCart, checkIfItemAlreadyExists } = useCart();

  function handleAddToCart(
    event: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    event.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | I-shop-04</title>
      </Head>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {isLoading ? (
                <>
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                </>
              ) : (
                <>
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
                            <CartButton
                              color="green"
                              size="large"
                              disabled={checkIfItemAlreadyExists(product.id)}
                              onClick={(event) =>
                                handleAddToCart(event, product)
                              }
                            />
                          </footer>
                        </Product>
                      </Link>
                    );
                  })}
                </>
              )}
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
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
