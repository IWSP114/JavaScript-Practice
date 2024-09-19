import { renderPaymentSummary } from './checkout/paymentSummary.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import { updateCartQuantity} from '../data/cart.js';

function loadPage() {

    renderOrderSummary();
    renderPaymentSummary();

}
loadPage();

document.querySelector('.js-return-to-home-link').innerHTML = updateCartQuantity() + ' items'