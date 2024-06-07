import { TiShoppingCart } from "react-icons/ti";
import { RiShoppingCart2Line } from "react-icons/ri";

const css = {
  color: "#fff",
  fontSize: "1.2rem",
  verticalAlign: "bottom",
  marginRight: "5px",
};

const CartImage = ({ itemAdded }: { itemAdded: boolean }) =>
  itemAdded ? (
    <TiShoppingCart style={css} />
  ) : (
    <RiShoppingCart2Line style={css} />
  );

export default CartImage;
