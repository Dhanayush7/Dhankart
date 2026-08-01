import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {

    const { cart } = useContext(CartContext);

    return (

        <div style={{padding:"30px"}}>

            <h1>Your Cart</h1>

            {cart.length === 0 ? (

                <h2>Your cart is empty.</h2>

            ) : (

                cart.map((item) => (

                    <div
                        key={item.id}
                        style={{
                            display:"flex",
                            gap:"20px",
                            margin:"20px 0",
                            border:"1px solid #ddd",
                            padding:"15px"
                        }}
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            width="120"
                        />

                        <div>

                            <h2>{item.name}</h2>

                            <h3>₹{item.price}</h3>

                        </div>

                    </div>

                ))

            )}

        </div>

    );
}

export default Cart;