import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../slices/cartSlice";
import CartImage from "./CartImage";
import Button from "../Button";

const AddToCart = ({
  id,
  name,
  brand,
  shortName,
  price,
  quantity,
  deal,
  discountCode,
}: AddToCartProps) => {
  const [itemId, setItemId] = useState("");
  const dispatch = useDispatch();
  const isAdded = itemId === id;

  const handleClick = () => {
    setItemId(id);

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
    <Button css={isAdded ? "cartAdded" : "cart"} onClick={handleClick}>
      <CartImage itemAdded={isAdded} />
      {id === itemId ? "Item Added" : "Add to cart"}
    </Button>
  );
};

export default AddToCart;
