import { useState, Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
const CartComponent = lazy(() =>
    import("./Components/CartComponent/CartComponent")
);
const NoUser = lazy(() => import("./Components/NoUser/NoUser"));
const Order = lazy(() => import("./Components/Order/Order"));
const Dashboard = lazy(() => import("./Components/Dashboard"));
const Loading = lazy(() => import("./Components/Loading"));
const Product = lazy(() => import("./Components/Product/Product"));

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(
        sessionStorage.getItem("userId") || null
    );
    const [mainer, setMainer] = useState(
        JSON.parse(sessionStorage.getItem("productMainer")) || []
    );
    const navigate = useNavigate();

    const onAdd = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...food, quantity: 1 }]);
        }
    };

    const onRemove = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== food.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : x
                )
            );
        }
    };

    const onCheckout = () => {
        navigate("/cart");
    };

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route
                    path="/order/:userId"
                    element={
                        <Order setUserId={setUserId} setMainer={setMainer} />
                    }
                />
                <Route
                    path={`/dashboard`}
                    element={
                        <Dashboard
                            mainer={mainer}
                            onRemove={onRemove}
                            onAdd={onAdd}
                            onCheckout={onCheckout}
                            cartItems={cartItems}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <CartComponent
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            setCartItems={setCartItems}
                            userId={userId}
                        />
                    }
                />
                <Route
                    path="/product/:productId"
                    element={
                        <Product
                            mainer={mainer}
                            onAdd={onAdd}
                            userId={userId}
                        />
                    }
                />
                <Route path="/not-found" element={<NoUser />} />
                <Route path="*" element={<NoUser />} />
            </Routes>
        </Suspense>
    );
}

export default App;
