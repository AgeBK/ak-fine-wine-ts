import styles from "./Button.module.css";

type ButtonProps = {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
  css: string;
  disabled?: boolean;
};

const Button = ({ children, css, onClick, disabled }: ButtonProps) => (
  <button
    className={styles[css]}
    onClick={onClick}
    disabled={false || disabled}
  >
    {children}
  </button>
);

export default Button;
