Vue.component("products", {
  props: ["products"],
  template: `<div class="catalog container"> <product v-for="item of products" :product="item"></product></div> `,
});

Vue.component("product", {
  props: ["product"],
  template: `
          <div class="catalog_cart" >
          <img class="catalog_cart_img" :src="product.img" width="250" height="270" alt="photo" />
          <h3 class="catalog_cart_title">{{ product.title }}</h3>
          <span class="catalog_cart_price"><span>{{ product.price }}</span>рублей</span>
          <button
            class="catalog_cart_button"
            data-productId="{{ product.price }}"
            @click="$root.addProducts(product)"
          >
            Добавить в корзину
          </button>
        </div>
  `,
});
