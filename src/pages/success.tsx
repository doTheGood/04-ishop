import { GetServerSideProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import Stripe from 'stripe';
import { stripe } from '../lib/stripe';
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from '../styles/pages/success';

interface ISuccessProps {
  customerName: string;
  productsImages: string[];
}

export default function Success({
  customerName,
  productsImages,
}: ISuccessProps) {
  return (
    <>
      <Head>
        <title>🎁🙂👍 | I-shop-04</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ImagesContainer>
          {productsImages.map((image, i) => (
            <ImageContainer key={i}>
              <Image src={image} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Great! You successfully finished your shopping</h1>

        <p>
          Very nice <strong>{customerName}</strong>! your
          <strong> {productsImages.length} T-Shirts</strong> and will soon be
          delivered to you.
        </p>

        <Link href="/">Back to the products overview</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return product.images[0];
  });

  return {
    props: {
      customerName,
      productsImages,
    },
  };
};
