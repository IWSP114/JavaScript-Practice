import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption, addToCart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
document.querySelector('.js-return-to-home-link').innerHTML = updateCartQuantity() + ' items'


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=
    `
    <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
                js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input type = "number" class="quantity-input js-quantity-input"></input>
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
                 data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,
                cartItem
            )}
            </div>
        </div>
        </div>
    `
});

function deliveryOptionsHTML (matchingProduct,
    cartItem
) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        const priceString = deliveryOption.priceCents === 0 
        ? 'FREE' 
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html +=
        `
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
        `
    });

    return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML; //Cart list html



document.querySelectorAll('.js-delete-link').forEach((link) => { //Delete button
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.remove();

        renderOrderSummary();
        renderPaymentSummary();
    })
    
});

document.querySelectorAll('.js-update-quantity-link').forEach((link, index) => { //Update button
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        //console.log(link);
        const saveElement = document.querySelectorAll(`.js-save-quantity-link`)[index];
        const inputElement = document.querySelectorAll(`.js-quantity-input`)[index];
        if(inputElement.classList.contains('is-editing-quantity')){ //input box exist
            saveElement.classList.remove('is-editing-quantity');
            inputElement.classList.remove('is-editing-quantity');
            link.classList.remove('to-none');
        } else {
            saveElement.classList.add('is-editing-quantity');
            inputElement.classList.add('is-editing-quantity');
            link.classList.add('to-none');
        } 
    })
});

document.querySelectorAll('.save-quantity-link').forEach((link, index) =>{ //Save button
    link.addEventListener('click', ()=> {
        const productId = link.dataset.productId;
        const inputElement = document.querySelectorAll(`.js-quantity-input`)[index];
        const labelElement = document.querySelectorAll(`.js-quantity-label`)[index];
        if(parseInt(inputElement.value) > 0 && inputElement.value !== '') {
            
            inputElement.classList.remove('is-editing-quantity');
            document.querySelectorAll(`.js-save-quantity-link`)[index].classList.remove('is-editing-quantity');
            document.querySelectorAll(`.js-update-quantity-link`)[index].classList.remove('to-none');

            addToCart(productId, document.querySelectorAll(`.js-quantity-input`)[index].value, 'change');
            renderOrderSummary();
            renderPaymentSummary();
            
        }
    })
  
});

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
    element.addEventListener('click', ()=> {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    });
});

}

