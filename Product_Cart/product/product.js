let container = document.getElementById("container");
let price_filter = document.getElementById("price-filter");
let rating_filter = document.getElementById("rating-filter");

let page = 1;
async function fetData(page = 1) {
  let res = await fetch(
    `http://localhost:3000/exterior?_page=${page}&_limit=7`
  );
  let data = await res.json();
  displayContent(data);
  console.log(data);
}

fetData();

function displayContent(data) {
  data.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let img_card = document.createElement("div");
    img_card.classList.add("img-card");

    let img = document.createElement("img");
    img.classList.add("img-in");
    img.src = element.image;

    let body = document.createElement("div");
    body.classList.add("card-body");

    let nama = document.createElement("h3");
    nama.classList.add("nama");
    nama.textContent = element.name;

    let rate = document.createElement("div");
    rate.classList.add("current-rating");
    let rate_span = document.createElement("span");
    let decimalNumber = element.rating / element.total_rating;
    let reducedDecimal = decimalNumber.toFixed(1);
    rate_span.textContent = `${reducedDecimal}/5`;

    let price = document.createElement("p");
    price.classList.add("price");
    price.textContent = element.price;

    let btn_view = document.createElement("button");
    btn_view.classList.add("btn-view");
    btn_view.setAttribute("id", "btn-view");
    btn_view.textContent = "View";

    btn_view.addEventListener("click", function () {
      localStorage.setItem("index", JSON.stringify(element.id));
      window.location.assign("../product_view/pro_view.html");
    });

    let btn_cart = document.createElement("button");
    btn_cart.classList.add("btn-cart");
    btn_cart.textContent = "Add to Cart";

    btn_cart.addEventListener("click", function (event) {
      event.preventDefault();
      addItem(element);
    });

    rate.append(rate_span);
    img_card.append(img);
    body.append(nama, rate, price, btn_cart, btn_view);

    card.append(img_card, body);
    container.append(card);
  });
}

async function addItem(element) {
  let res = await fetch(`http://localhost:3000/cart`);
  let data = await res.json();

  let flag = true;
  data.forEach((el) => {
    if (el.id == element.id) {
      flag = false;
    }
  });

  element.qty = 1;

  if (flag) {
    let res_add = await fetch(`http://localhost:3000/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(element),
    });
    let data1 = res_add.json();
    console.log(data1);
  }
}

price_filter.addEventListener("change", async function () {
  if (price_filter.value == "lowtohigh") {
    let res = await fetch(
      `http://localhost:3000/exterior?_sort=price&_order=asc`
    );
    let data = await res.json();
    container.innerHTML = "";
    displayContent(data);
  } else {
    let res = await fetch(
      `http://localhost:3000/exterior?_sort=price&_order=desc`
    );
    let data = await res.json();
    container.innerHTML = "";
    displayContent(data);
  }
});

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 20
  ) {
    console.log("hi");
    page++;
    fetData(page);
  }
});

rating_filter.addEventListener("change", async function () {
  let val = rating_filter.value;
  let res = await fetch(`http://localhost:3000/exterior`);
  let data = await res.json();

  let data_arr = data.filter((el) => {
    if (val == "rate_1") {
      return el.rating / el.total_rating <= 1;
    }

    if (val == "rate_2") {
      return el.rating / el.total_rating <= 2;
    }

    if (val == "rate_3") {
      return el.rating / el.total_rating >= 3;
    }
  });
  container.innerHTML = "";
  console.log(data_arr);
  displayContent(data_arr);
});
