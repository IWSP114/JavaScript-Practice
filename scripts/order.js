import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption, addToCart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';

import {formatCurrency} from './utils/money.js';

const orderTime = JSON.parse(localStorage.getItem('OrderDate'));
    let cartSummaryHTML = '';

    cart.forEach((cartItem, index) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        
        cartSummaryHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTime[index].todayString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderTime[index].productPriceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${matchingProduct.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${orderTime[index].dateString}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

          </div> 
        </div>
        `;
    });
    
    document.querySelector('.js-orders-grid').innerHTML = cartSummaryHTML;
    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

