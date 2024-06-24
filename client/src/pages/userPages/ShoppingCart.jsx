import React from 'react'
import CartProducts from '../../components/shoppingCart/CartProducts'

function ShoppingCart({token,chosenCartProducts,setChosenCartProducts}) {
  return (
    <div>
      <CartProducts token={token}  setChosenCartProducts={setChosenCartProducts} chosenCartProducts={chosenCartProducts}/>
    </div>
  )
}

export default ShoppingCart
