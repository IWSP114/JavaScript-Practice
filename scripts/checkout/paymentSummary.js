import {cart, updateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js'
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach ((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents =  totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row js-payment-summary-row">
            <div class="quantity-row">Items : (${updateCartQuantity()})</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div> 
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary
            js-place-order">
            Place your order
        </button>
    `;

    

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', () => {
        const dateArray = [];
        cart.forEach((cartItem) => {
            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOption(deliveryOptionId);
            const today = dayjs();
            const todayString = today.format('MMMM D');
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
            const dateString = deliveryDate.format('MMMM D');

            const product = getProduct(cartItem.productId);
            productPriceCents = product.priceCents * cartItem.quantity;
            dateArray.push({todayString, dateString, productPriceCents});
        });
        localStorage.setItem('OrderDate', JSON.stringify(dateArray));
        window.location.href = 'orders.html'
    });
}
