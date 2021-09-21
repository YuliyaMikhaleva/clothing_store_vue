"use strict";
//у нас есть API(путь к нашему ресурсу в интернете), из которого мы будем брать товары
const API_URL =
  "https://raw.githubusercontent.com/YuliyaMikhaleva/clothing_store_api/master/response";

//создаем объект vue
const app = new Vue({
  el: "#app",
  data: {
    //глобальные свойства объекта (поля класса)
    catalogUrl: "/catalogData.json", //файл, откуда мы берем товары
    products: [], //массив каталога товаров, который будет заполняться
    imgCatalog: "img/standart.jpg", //путь к изображению для всех товаров
    searchLine: "", //свойство для фильтра: то, что введем в инпут, моментально становится доступным в этом свойстве
    show: false, //свойство для корзины, отвечающие за видимость корзины
    cartItems: [], //товары корзины
    // filtered:[],//отфильтрованные товары
    counter: 0, //счетчик товаров в корзине
    totalSumm: 0, //итоговая сумма товаров
  },
  methods: {
    getJson(url) {
      //метод, который дает возможность преобразовать наш url, извлекать из него данные
      // и преобразовать в объект js
      return fetch(url) //передаем ссылку
        .then((result) => result.json()) //в случае успешного выполнения преобразовываем данные в формат json
        .catch((error) => {
          //в случае ошибки в консоли выведется ошибка
          console.log(error);
        });
    },
    /**
     * Добавить товар
     * @param product
     */
    addProducts(product) {
      console.log(product.id_product);
      this.counter++; //увеличить счетчик в правом верхнем углу
      this.addInObjectBasket(product); //добавить товар в объект корзины
      this.totalSumm += product.price; //итоговая сумма будет прибавлять цену товара, который добавили
    },
    //ищем в массиве товаров корзины среди элементов корзины такой товар,
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
        this.totalSumm -= product.price; //пересчитываем итоговую стоимость за всю корзину товаров
      } else {
        //иначе
        this.deleteFromObject(product); //удаляем товар с выбранным id из объекта корзины
        this.totalSumm -= product.price; //пересчитываем итоговую стоимость за всю корзину товаров
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
  mounted() {
    //свойство, которое запускается первым же делом
    this.getJson(`${API_URL + this.catalogUrl}`) //берем данные с сервера, парсим их
      .then((data) => {
        // затем проходимся по данным циклом
        for (let elements of data) {
          this.products.push(elements); //заполняем нашими товарами массив каталога
          // this.filtered.push(elements);//заволняем нашими товарами массив отфильтрованных товаров
        }
      });
  },
});
