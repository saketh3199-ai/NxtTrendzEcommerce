import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component 
{
  state = {cartList: []}

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => 
    {
      //check if product is present in the array
      //if yes, update the quantity key
      //if no, insert product as item

      const {cartList} = this.state

      const IsTheItemPresent = 
      cartList.some
      (
        (ArrayProductObject)=>
        {
           return  (ArrayProductObject.id === product.id)
          
           
          
        }
      )

      //below if block represents that the product is already present in the cartList Array
      if (IsTheItemPresent)
      {
        

       this.setState
        (

          (previousState)=>
          {
            const updatedCartList = 
            previousState.cartList.map
            (
              (cartListObject)=>
              {
                if (cartListObject.id === product.id)
                {
                  return {...cartListObject,quantity:cartListObject.quantity+product.quantity}
                
                }
                else
                {
                  return cartListObject
                }
              
              }
            
            
            )
            
            return {cartList:updatedCartList}
          
          
          }
        )


        
      }
      //below else block represents that the product is absent in the cartList Array
      else
      {
         this.setState
          (
           (prevState)=> 
            {
              return  {cartList: [...prevState.cartList, product]}
            }
              
          )
      }
   
    }

    removeCartItem = (id)=>
    {
        const {cartList} = this.state

        const ItemDeletedCartList = 
        cartList.filter
        (
          (cartListObject)=>
          {
            if (cartListObject.id !== id)
            {
              return cartListObject
            }
          }
        )

      this.setState({cartList:ItemDeletedCartList})

    }

    removeAllCartItems = ()=>
    {
      this.setState({cartList:[]})
    }

    incrementCartItemQuantity = (id)=>
    {
      
      this.setState
      (
        (previousState)=>
        {

          const IncrementedQuantityCartListArray = previousState.cartList.map
          (
            (cartListObject)=>
            {
              if (cartListObject.id === id)
              {
                const UpdatedSpecificCartItemObject = {...cartListObject,quantity:cartListObject.quantity+1}
                return UpdatedSpecificCartItemObject
              }
              else
              {
                return cartListObject
              }
            }
          )
          return {cartList: IncrementedQuantityCartListArray}
        }
      )
    }
    decrementCartItemQuantity=(id)=>
    {
      const {cartList} = this.state

      const indexOfItemObject = cartList.findIndex
      (
        (ItemObject)=>
        {
          if (ItemObject.id === id)
          {
            return true
          }
        }
      )

      const isQuantityOne = (cartList[indexOfItemObject].quantity === 1)

      if (isQuantityOne)
      {
        const UpdatedCartListExcludedCartItem = cartList.filter
        (
          (cartObject)=>
          {
            if (cartObject.id !== id)
            {
              return cartObject
            }
          }
        )

        this.setState({cartList:UpdatedCartListExcludedCartItem})
      }

      else
      {
        const DecrementedUpdatedCartList = cartList.map
        (
          (cartObject)=>
          {
            if (cartObject.id === id)
            {
              return {...cartObject,quantity:cartObject.quantity-1}
            }
            else
            {
              return cartObject
            }
          }
        )

        this.setState({cartList:DecrementedUpdatedCartList})
      }

    }
    
  render() 
  {
    const {cartList} = this.state

    return (
      <CartContext.Provider value={{decrementCartItemQuantity:this.decrementCartItemQuantity,cartList,addCartItem: this.addCartItem,removeCartItem: this.removeCartItem,removeAllCartItems:this.removeAllCartItems,incrementCartItemQuantity:this.incrementCartItemQuantity}}>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute exact path="/products/:id" component={ProductItemDetails}/>
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
