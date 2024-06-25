import React from 'react'
import CartProducts from '../../components/shoppingCart/CartProducts'

function ShoppingCart({chosenCartProducts,setChosenCartProducts}) {
  return (
    <div>
      <CartProducts  setChosenCartProducts={setChosenCartProducts} chosenCartProducts={chosenCartProducts}/>
    </div>
  )
}

export default ShoppingCart
