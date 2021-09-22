const basketItem = {
  props: ["cart-item"],
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
                    <button class="basket_item_delete" @click="$parent.removeProducts(cartItem)">
                    Удалить товар
                </button>
            </div>
        </div>
  `,
};
const basket = {
  components: { basketItem },
  data() {
    return {
      cartItems: [], //товары корзины
    };
  },
  methods: {
    addProducts(product) {
      console.log(product.id_product);
      this.$parent.counter++; //увеличить счетчик в правом верхнем углу
      this.addInObjectBasket(product); //добавить товар в объект корзины
      this.$parent.totalSumm += product.price; //итоговая сумма будет прибавлять цену товара, который добавили
    },

    // ищем в массиве товаров корзины среди элементов корзины такой товар,
    // у которого id будет равно нами выбранному
    /**
     * Добавить товар в объект корзины
     * @param product
     */
    addInObjectBasket(product) {
      let itemId = this.cartItems.find((element) => element.id_product === product.id_product);
      if (itemId) {
        //если такой товар нашли
        itemId.count++; //увеличиваем его количество на 1 (product.count указывали в верстке)
        itemId.finishprice = itemId.count * itemId.price; //пересчитываем сумму за товар сумму этим id
        console.log(this.cartItems);
      } else {
        //иначе
        //создаем объект товара с количеством 1 и суммарной стоимостью равной цене товара
        const good = Object.assign({ count: 1, finishprice: product.price }, product);
        this.cartItems.push(good); //добавляем этот товар в массив товаров в корзине
        console.log(this.cartItems);
      }
    },
    /**
     * Удалить товар из корзины
     * @param product
     */
    removeProducts(product) {
      this.counter--; //уменьшаем счётчик товаров на 1
      if (product.count > 1) {
        //Если количество товара больше 0
        product.count--; //уменьшаем количество на единицу
        product.finishprice = product.count * product.price; //пересчитываем стоимость за вид товара
        this.$parent.totalSumm -= product.price; //пересчитываем итоговую стоимость за всю корзину товаров
      } else {
        //иначе
        this.deleteFromObject(product); //удаляем товар с выбранным id из объекта корзины
        this.$parent.totalSumm -= product.price; //пересчитываем итоговую стоимость за всю корзину товаров
      }
    },
    /**
     * Удалить товар из объекта
     * @param product
     */
    deleteFromObject(product) {
      let basketDelete; //создаем новую переменную
      //перебираем массив корзины, и каждому элементу передаем функцию
      this.cartItems.forEach(function (element, i) {
        //в которую передаем 2 параметра: элемент корзины и число
        if (element.id_product == product.id_product) {
          //если значение id нажатого товара совпадает с элементом корзины
          basketDelete = i; // мы будем знать порядковый номер этого элемента
        }
      });
      //удаляем из корзины товаров 1 товар с порядкового номера това с выбранным id
      this.cartItems.splice(basketDelete, 1);
      console.log(this.cartItems);
    },
  },
  template: `
          <div class="basket" v-if="$root.show">
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
};
