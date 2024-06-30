import React from 'react'
import CartProducts from '../../components/shoppingCart/CartProducts'

function ShoppingCart({chosenCartProducts,setChosenCartProducts,setCountCartItems}) {
  return (
    <div>
      <CartProducts setCountCartItems={setCountCartItems} setChosenCartProducts={setChosenCartProducts} chosenCartProducts={chosenCartProducts}/>
    </div>
  )
}

export default ShoppingCart
