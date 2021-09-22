Vue.component("basket", {
  props: ["cartItems", "show"],
  template: `
        <div class="basket" v-if="show">
            <h3 class="basket_title">Ваша корзина</h3>
            <div class="basket_parametrs">
                <span class="basket_part">Название товара</span>
                <span class="basket_part">Количество</span>
                <span class="basket_part">Цена за шт.</span>
                <span class="basket_part">Итого</span>
                <span class="basket_part"></span>
            </div>
<!--          если корзина пустая-->
            <p v-if="!cartItems.length">Корзина пока пуста...</p>
           <basket-item v-for="item of cartItems" :cart-item="item"></basket-item>
           <div class="cart_summ">
              <span>Товаров в корзине на сумму:<span class="basket_summ"> {{$root.totalSumm}} </span> рублей</span>
           </div>
        </div>
    `,
});

Vue.component("basketItem", {
  props: ["cartItem"],
  template: `
        
        <div class="newProducts">
        <!--        Здесь будут добавлены товары в корзине-->

                <div class="basket_item">
                    <span class="basket_part">{{ cartItem.title }}</span>
                    <span class="basket_part"
                    ><span class="product_number">{{ cartItem.count }}</span> шт.</span
                    >
                    <span class="basket_part"
                    ><span class="product_price">{{ cartItem.price }}</span> руб.</span
                    >
                    <span class="basket_part"
                    ><span class="summOfRow" class="product_price">{{ cartItem.finishprice }}</span>
                        руб.</span
                    >
                    <button class="basket_item_delete" @click="$root.removeProducts(cartItem)">
                    Удалить товар
                </button>
            </div>
<!--                   <div class="cart_summ">-->
<!--                        <span>Товаров в корзине на сумму:<span class="basket_summ"> {{ totalSumm }} </span> рублей</span>-->
<!--                    </div>-->
        </div>

    `,
});

// <div class="basket" v-if="show">
//     <h3 class="basket_title">Ваша корзина</h3>
//     <div class="basket_parametrs">
//         <span class="basket_part">Название товара</span>
//         <span class="basket_part">Количество</span>
//         <span class="basket_part">Цена за шт.</span>
//         <span class="basket_part">Итого</span>
//         <span class="basket_part"></span>
//     </div>
//     <!--          если корзина пустая-->
//     <p v-if="!cartItems.length">Нет данных</p>
//     <div class="newProducts" v-for="product of cartItems">
//         <!--        Здесь будут добавлены товары в корзине-->
//
//         <div class="basket_item">
//             <span class="basket_part">{{ product.title }}</span>
//             <span class="basket_part"
//             ><span class="product_number">{{ product.count }}</span> шт.</span
//             >
//             <span class="basket_part"
//             ><span class="product_price">{{ product.price }}</span> руб.</span
//             >
//             <span class="basket_part"
//             ><span class="summOfRow" class="product_price">{{ product.finishprice }}</span>
//                 руб.</span
//             >
//             <button class="basket_item_delete" @click="removeProducts(product)">
//             Удалить товар
//         </button>
//     </div>
// </div>
// <div class="cart_summ">
//             <span
//             >Товаров в корзине на сумму:<span class="basket_summ"> {{ totalSumm }} </span
//             >рублей</span
//             >
// </div>
// </div>
