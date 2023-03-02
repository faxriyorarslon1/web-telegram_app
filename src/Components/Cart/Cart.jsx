import Button from "../Button/Button";
import imgCart from "../../images/icon/shopping-cart.png";
import "./Cart.css";

function Cart({ cartItems, onCheckout }) {
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

    return (
        <div className="cart__container">
            <span className="price__total">
                Total Price:{" "}
                <span className="bold">{totalPrice.toFixed(2)}$</span>
            </span>
            <div className="cart__shopping">
                <Button
                    title={
                        <img
                            loading="lazy"
                            decoding="async"
                            width={150}
                            height={150}
                            src={imgCart}
                            alt="card shopping"
                        />
                    }
                    type={"checkout"}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onCheckout}
                />
                <span
                    className={`${
                        cartItems.length !== 0
                            ? "card__badge"
                            : "card__badge--hidden"
                    }`}
                >
                    {cartItems.length}
                </span>
            </div>
        </div>
    );
}

export default Cart;
