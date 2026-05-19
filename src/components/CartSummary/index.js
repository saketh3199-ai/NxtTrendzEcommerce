 
import './index.css'

const CartSummary = (props) => 
{
  const {totalBill,totalItemsInCart} = props
  return (
    <div className="order-summary">
      <h1 className="order-total">
        Order Total: <span className="amount">Rs {totalBill}/-</span>
      </h1>
      <p className="items">{totalItemsInCart} Items in cart</p>
      <button className="checkout-btn">Checkout</button>
    </div>
  )
}

export default CartSummary