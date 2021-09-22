const product = {
  props: ["product"],
  template: `
          <div class="catalog_cart" >
          <img class="catalog_cart_img" :src="product.img" width="250" height="270" alt="photo" />
          <h3 class="catalog_cart_title">{{ product.title }}</h3>
          <span class="catalog_cart_price"><span>{{ product.price }}</span>рублей</span>
          <button
            class="catalog_cart_button"
            data-productId="{{ product.price }}"
            @click="$root.$refs.basket.addProducts(product)"
          >
            Добавить в корзину
          </button>
        </div>
  `,
};

const products = {
  components: { product }, //вложенные компоненты
  data() {
    return {
      catalogUrl: "/catalogData.json", //файл, откуда мы берем товары
      products: [], //массив каталога товаров, который будет заполняться
      filtered: [], //отфильтрованные товары
      imgCatalog: "img/standart.jpg", //путь к изображению для всех товаров
    };
  },
  mounted() {
    //свойство, которое запускается первым же делом
    this.$root
      .getJson(`${API_URL + this.catalogUrl}`) //берем данные с сервера, парсим их
      .then((data) => {
        // затем проходимся по данным циклом
        for (let elements of data) {
          this.products.push(elements); //заполняем нашими товарами массив каталога
          this.filtered.push(elements); //заволняем нашими товарами массив отфильтрованных товаров
        }
      });
  },
  template: `
  <div class="catalog container"> <product v-for="item of products" :product="item"></product></div>
  `,
};
