import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import useCartState from "../../hooks/useCartState";
import CartOpen from "../CartOpen";
import CartClosed from "../CartClosed";
import styles from "./Cart.module.css";

type CartQtyPriceProps = {
  totalQty: number;
  totalPrice: number;
};

const Cart = () => {
  const cart: CartProps = useSelector(selectCart);
  const [ref, isOpen, handleClose] = useCartState();

  const CartQtyPrice: CartQtyPriceProps = Object.values(cart).reduce(
    (acc: CartQtyPriceProps, { quantity, price, dealPrice }: CartItemProps) => {
      acc.totalQty += quantity;
      acc.totalPrice += (dealPrice || price) * quantity;
      return acc;
    },
    {
      totalQty: 0,
      totalPrice: 0,
    }
  );

  const { totalPrice, totalQty } = CartQtyPrice;

  return (
    <div className={styles.cartOuterContainer} ref={ref}>
      <div className={styles.container}>
        {isOpen && totalQty && totalPrice ? (
          <CartOpen
            totalPrice={totalPrice}
            totalQty={totalQty}
            handleClose={handleClose}
          />
        ) : (
          <CartClosed totalPrice={totalPrice} totalQty={totalQty} />
        )}
      </div>
    </div>
  );
};

export default Cart;
