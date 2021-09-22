"use strict";
//у нас есть API(путь к нашему ресурсу в интернете), из которого мы будем брать товары
const API_URL =
  "https://raw.githubusercontent.com/YuliyaMikhaleva/clothing_store_api/master/response";

//создаем объект vue
const app = new Vue({
  el: "#app",
  data: {
    // глобальные свойства объекта (поля класса)
    catalogUrl: "/catalogData.json", //файл, откуда мы берем товары
    // products: [], //массив каталога товаров, который будет заполняться
    imgCatalog: "img/standart.jpg", //путь к изображению для всех товаров
    show: false, //свойство для корзины, отвечающие за видимость корзины
    cartItems: [], //товары корзины
    // filtered: [], //отфильтрованные товары
    counter: 0, //счетчик товаров в корзине
    totalSumm: 0, //итоговая сумма товаров
    error: false,
  },
  components: { products, basket },
  methods: {
    getJson(url) {
      //метод, который дает возможность преобразовать наш url, извлекать из него данные
      // и преобразовать в объект js
      return fetch(url) //передаем ссылку
        .then((result) => result.json()) //в случае успешного выполнения преобразовываем данные в формат json
        .catch((error) => {
          //в случае ошибки в консоли выведется ошибка
          console.log(error);
          this.error = error;
        });
    },
  },
});
