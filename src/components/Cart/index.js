 
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
          {
            value => 
            {
              const {cartList,removeAllCartItems} = value
              const showEmptyView = cartList.length === 0
              let totalBill=0;
              for (let ItemObject of cartList)
              {
                totalBill = (totalBill + ItemObject.quantity * ItemObject.price)
              }

              // console.log(`The total bill is ${totalBill} `  )
              
              
              // TODO: Update the functionality to remove all the items in the cart
              const onClickRemoveAll = ()=>
              {
                removeAllCartItems()
              }
              


              return (
                <>
                  <Header />
                  <div className="cart-container">
                    {
                      showEmptyView ? 
                      
                      (<EmptyCartView />) : 
                      
                      (
                      <div className="cart-content-container">
                        <h1 className="cart-heading">My Cart</h1>
                        <button className="remove-all-btn" onClick={onClickRemoveAll}>Remove All</button>
                        <CartListView />
                        <CartSummary totalBill={totalBill} totalItemsInCart={cartList.length}/>
                      </div>
                      )
                    }
                  </div>
                </>
              )
            }
          }
  </CartContext.Consumer>
)
export default Cart
