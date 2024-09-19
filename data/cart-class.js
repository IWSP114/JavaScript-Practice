class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();

    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
      
        if(!this.cartItems) {
            this.cartItems = [{
            productId: 
            'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
            }, {
            productId:
            '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
            }]; 
        }
      
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
              matchingItem = cartItem;
            }
        });
      
        if(matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
        newCart.push(cartItem);
        }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
              matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.localStorageKey = 'aaa';

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);




//   export function updateCartQuantity() {
  
//     let cartQuantity = 0;
//         cart.forEach((cartItem) => {
//           cartQuantity += cartItem.quantity;
//         });
//         // if(document.querySelector('.js-cart-quantity')){ //at amazon page
//         //   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
//         // } else { //at checkout page
//         //   document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity + ' items';
//         //   //document.querySelector('.js-payment-summary-row').innerHTML = 'Items (' + cartQuantity + ')';
//         // }
  
//   }

  