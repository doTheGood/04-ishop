import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/future/image';
import { X } from 'phosphor-react';
import { CartButton } from '../CartButton';
import {
  CartClose,
  CartContent,
  CartFinalization,
  CartProduct,
  CartProductDetails,
  CartProductImage,
  FinalizationDetails,
} from './styles';

export function Cart() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>
          <h2>Sacola de compras</h2>
          <section>
            {/* <p>Parece que seu carrinho está vazio 😕 </p> */}

            <CartProduct>
              <CartProductImage>
                <Image
                  width={100}
                  height={93}
                  alt=""
                  src="https://s3-alpha-sig.figma.com/img/387d/13ce/de131bd1ccf9bbe6b2331e88d3df20cd?Expires=1665964800&Signature=eRip5zM0xcid60KsBVoA1e4VB9XM-2rtr1wfN5UGqzM0y0if6NDCIF4f8n62xOO~JCuQnCZ5k~xx-C1XgCbXs4luHdzfhBOQhUmqfxMNfwf61i8rsboFeGPvKF5qJWYNLSiRq05KwWvIDB6LZysA4FN86fAsbN0ytJ~s0yxlWjZmxFxr46B9842Na1j-OZR2wYlR6F~6ctfaPXtSZajM-Eubd6D34fQFKKuZ2m6Jp4JVBBPHhQODonL6xWTIP0TW6lNMRaALapIhGeafIjHxxJ-GnnF4FF5JFjeCKo8y4v8dS46f9Ft4JxOYKq8TNxaxrJJHthYSo1SzCGGg3pcR0A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                />
              </CartProductImage>
              <CartProductDetails>
                <p>Produto 1</p>
                <strong>R$ 50.00</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>2 itens</p>
              </div>
              <div>
                <span>Valor total</span>
                <p>R$ 100.00</p>
              </div>
            </FinalizationDetails>
            <button>Finalizar compra</button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
