let cartIcon = document.querySelector('.cart_icon');
let hanldeCartIconClick = e => e.target.closest('header').querySelector('.cart_box').toggleAttribute('show');
cartIcon.addEventListener('click', hanldeCartIconClick);
let [qty, product_price, product_name, product_image] = ['.qty', '.product_price', '.product_name', '.main'].map(el => document.querySelector(el))
let plusAndMinus = document.querySelectorAll('.changeQty')
let addToCart = document.querySelector('.add_to_cart')
let cartEl = document.querySelector('.items')
let cart = []
let cartItemTemplate = (cartItem) => `
        <div class="item flex gap-4 items-center">
          <img src="${cartItem.img}" alt="${cartItem.productName}" class="w-12 h-12 object-cover">
          <div class="info flex flex-wrap text-dark_grayish_blue items-center gap-1 ">
            <span class="name block w-full">${cartItem.productName}</span>
            <span class="item_price inline-block" price="125">$${cartItem.price}</span>
            <span class="inline-block">x</span>
            <span class="item_qty inline-block">${cartItem.qty}</span>
            <span class="item_total inline-block font-bold ">$${cartItem.total}</span>
          </div>
          <img src="./images/icon-delete.svg"  id="${cartItem.uuid}" alt="icon-delete" class="w-4 h-4 object-cover delete_btn">
        </div>
`
let handleInput = (e) => {
    if (!Number.isInteger(e.target.value)) e.target.value = 0
}
let handleChangeQty = (e) => {
    let currentQty = qty.value
    if (e.target.classList.contains('plus')) {
        qty.value = parseInt(currentQty) + 1
        return true
    }
    if (currentQty <= 0) return false
    qty.value = currentQty - 1

}
let updateCartQty = (qty) => document.querySelector('.cart_qty').textContent = qty
let getCart = () => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
let saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
let addCart = (cartItem) => {
    let oldCartItem = cart.find(item => item.productID == cartItem.productID)
    if (!oldCartItem) {
        cart.push(cartItem);
        return false
    }
    oldCartItem.qty = parseInt(oldCartItem.qty) + parseInt(cartItem.qty)
}
let deleteCartItem = (id) => {
    let index = cart.findIndex(item => item.productID == id)
    cart.splice(index, 1)
}
let reloadEvent = () => {
    document.querySelectorAll('.delete_btn').forEach(el => el.addEventListener('click', function (e) {
        let id = e.target.getAttribute('id')
        deleteCartItem(id)
        saveCart(cart)
        renderCart()
    }))
}
let renderCart = () => {
    cartEl.toggleAttribute("empty", true)

    cart = getCart()
    cartEl.innerHTML = ''
    cart.forEach(item => {
        let itemNode = cartItemTemplate(item)
        cartEl.insertAdjacentHTML('beforeend', itemNode)
    })
    updateCartQty(cart.length ?? 0)
    if (!cart.length || cart.length <= 0) {
        cartEl.insertAdjacentHTML('beforeend', `<span>Your cart is empty.</span>`)
        return false
    }
    reloadEvent()
    cartEl.toggleAttribute("empty", false)

}
let handleAddToCart = () => {
    let cartItem = {
        //maybe we can use product uuid in reallife
        productName: product_name.textContent,
        productID: product_name.getAttribute('product_id'),
        price: product_price.getAttribute('data-price'),
        qty: qty.value,
        img: product_image.getAttribute('classic'),

    }
    cartItem.total = parseInt(cartItem.qty) * parseFloat(cartItem.price)
    addCart(cartItem)
    saveCart(cart)
    renderCart()
}
qty.addEventListener('input', handleInput)
plusAndMinus.forEach(el => el.addEventListener('click', handleChangeQty))
addToCart.addEventListener('click', handleAddToCart)
renderCart()
