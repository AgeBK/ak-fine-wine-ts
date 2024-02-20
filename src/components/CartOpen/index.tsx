import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  selectCart,
  applyDiscountCode,
} from "../../slices/cartSlice";
import CartPrice from "../CartPrice";
import CartItemSaving from "../CartItemSaving";
import Img from "../Image";
import Button from "../Button";
import styles from "./CartOpen.module.css";

type CartOpenProps = {
  totalPrice: number;
  totalQty: number;
  handleClose: () => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
};

const CartOpen = ({
  totalPrice,
  totalQty,
  handleClose,
  discountCode,
  setDiscountCode,
}: CartOpenProps) => {
  const dispatch = useDispatch();
  const cart: CartProps = useSelector(selectCart);
  const [codeEntered, setCodeEntered] = useState(false);

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      dispatchDiscountCode();
    } else if (codeEntered === true) {
      setCodeEntered(false);
    }
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setDiscountCode(value);

  const dispatchDiscountCode = () => {
    setCodeEntered(true);
    dispatch(applyDiscountCode(discountCode));
  };

  const removeFromCart = (id: string, all: boolean) =>
    dispatch(decrement({ id, all }));

  const addToCart = ({
    id,
    name,
    brand,
    shortName,
    price,
    quantity,
    deal,
    discountCode,
  }: AddToCartProps) => {
    dispatch(
      increment({
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        discountCode,
      })
    );
  };

  return (
    <section className={styles.cart}>
      <div className={styles.totalItems}>
        <span>{totalQty} </span>
        items in your shopping cart
        <Button css="close" onClick={handleClose}>
          X
        </Button>
      </div>
      <ul className={styles.list}>
        {Object.entries(cart).map(
          ([
            id,
            { name, brand, shortName, quantity, price, deal, dealPrice },
          ]) => (
            <li className={styles.itemCont} key={id} value={name}>
              <div className={styles.item}>
                <div className={styles.cartImg}>
                  <Img
                    image={`wine/${id}.jpg`}
                    imageStyle="cartOpen"
                    imageAlt={name}
                  />
                </div>
                <div className={styles.cartProd}>
                  <h3 className={styles.hdr}>{brand}</h3>
                  <div className={styles.shortName}>{shortName}</div>
                  <div className={styles.buttons}>
                    <span className={styles.oneItem}>
                      <Button
                        onClick={() => {
                          removeFromCart(id, false);
                        }}
                        css="cartMinus"
                      ></Button>
                      <span className={styles.amount}>{quantity}</span>
                      <Button
                        onClick={() => {
                          addToCart({
                            id,
                            name,
                            brand,
                            shortName,
                            price,
                            quantity: 1,
                            deal,
                            discountCode,
                          });
                        }}
                        css="cartAdd"
                      ></Button>
                    </span>
                  </div>
                </div>
                <div className={styles.details}>
                  <Button
                    onClick={() => {
                      removeFromCart(id, true);
                    }}
                    css="noStyle"
                  >
                    <Img
                      image={`btn/remove.png`}
                      imageStyle="cartOpenBtn"
                      imageAlt={name}
                    />
                  </Button>
                  <CartPrice
                    quantity={quantity}
                    price={price}
                    dealPrice={dealPrice}
                  />
                </div>
              </div>
              <div className={styles.itemSavings}>
                <CartItemSaving
                  price={price}
                  dealPrice={dealPrice}
                  quantity={quantity}
                />
              </div>
            </li>
          )
        )}
      </ul>
      <div className={styles.discountCode}>
        <input
          className={styles.inputCode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter promo/discount code here"
          value={discountCode}
        />
        <Button css="discount" onClick={dispatchDiscountCode}>
          Apply
        </Button>
      </div>
      {codeEntered && <div className={styles.codeEntered}>Code entered:</div>}
      <div className={styles.total}>
        <span>
          Total Items: <b>{totalQty}</b>
        </span>
        <span className={styles.totalPrice}>
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </section>
  );
};

export default CartOpen;
