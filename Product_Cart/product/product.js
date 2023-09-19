let container = document.getElementById("container");

let page = 1;
let flag = true;

async function fetData(page = 1) {
  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/exterior?_page=${page}&_limit=8`
  );
  let data = await res.json();
  flag = true;
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

    let icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-tag fa-flip-horizontal");

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
    body.append(nama, rate, icon, price, btn_cart, btn_view);

    card.append(img_card, body);
    container.append(card);
  });
}

async function addItem(element) {
  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/cart`
  );
  let data = await res.json();

  let flag = true;
  data.forEach((el) => {
    if (el.id == element.id) {
      flag = false;
    }
  });

  element.qty = 1;

  if (flag) {
    let res_add = await fetch(
      `https://mock-server-team-masai-blvy.onrender.com/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      }
    );
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 20
  ) {
    if (flag == true) {
      page++;
      fetData(page);
    }
  }
});

// price  slider

let rangeInput = document.querySelectorAll(".range-input input");
let priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");
let priceGap = 1000;

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(priceInput[0].value),
      maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= priceGap && maxVal <= 10000) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxVal;
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

let input_min = document.getElementById("input-min");
let input_max = document.getElementById("input-max");
let range_min = document.getElementById("range-min");
let range_max = document.getElementById("range-max");

input_min.addEventListener("input", async function () {
  let min = input_min.value;
  let max = input_max.value;

  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/exterior?price_gte=${min}&price_lte=${max}`
  );
  let data = await res.json();
  flag = false;
  container.innerHTML = "";
  displayContent(data);
});

input_max.addEventListener("input", async function () {
  let min = input_min.value;
  let max = input_max.value;

  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/exterior?price_gte=${min}&price_lte=${max}`
  );
  let data = await res.json();
  flag = false;
  container.innerHTML = "";
  displayContent(data);
});

range_min.addEventListener("input", async function () {
  let min = input_min.value;
  let max = input_max.value;

  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/exterior?price_gte=${min}&price_lte=${max}`
  );
  let data = await res.json();
  flag = false;
  container.innerHTML = "";
  displayContent(data);
});

range_max.addEventListener("input", async function () {
  let min = input_min.value;
  let max = input_max.value;

  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/exterior?price_gte=${min}&price_lte=${max}`
  );
  let data = await res.json();
  flag = false;
  container.innerHTML = "";
  displayContent(data);
});

//radio filter for brand
// Get references to all radio buttons with class "gender-radio"
const brand_radio = document.querySelectorAll(".brand_radio");

// Add event listeners to all gender radios
brand_radio.forEach(function (radio) {
  // rating_radio.checked = false;
  radio.addEventListener("change", async function () {
    if (radio.checked) {
      let val = radio.value;
      console.log(val);
      try {
        let res = await fetch(
          `https://mock-server-team-masai-blvy.onrender.com/exterior?brand=${val}`
        );
        let data = await res.json();
        container.innerHTML = "";
        displayContent(data);
      } catch (error) {
        console.log(error);
      }
    }
  });
});

// filter for rating
let rating_radio = document.querySelectorAll(".rating_radio");

rating_radio.forEach(function (radio) {
  radio.addEventListener("change", async function () {
    // brand_radio.checked = false;
    if (radio.checked) {
      let val = radio.value;

      try {
        let res = await fetch(
          `https://mock-server-team-masai-blvy.onrender.com/exterior`
        );
        let data = await res.json();

        let data_arr = data.filter((el) => {
          if (val == "1") {
            return el.rating / el.total_rating >= 1;
          } else if (val == "2") {
            return el.rating / el.total_rating >= 2;
          } else if (val == "3") {
            return el.rating / el.total_rating >= 3;
          } else if (val == "4") {
            return el.rating / el.total_rating >= 4;
          }
        });
        container.innerHTML = "";
        console.log(data_arr);
        displayContent(data_arr);
      } catch (error) {
        console.log(error);
      }
    }
  });
});

//search bar

// Get a reference to the input element
const search = document.getElementById("search");

// Initialize a variable to store the timeout ID
let timeoutId;

search.addEventListener("input", function () {
  clearTimeout(timeoutId);

  console.log("hello1");
  timeoutId = setTimeout(function () {
    de_bounce();
  }, 500);
});

async function de_bounce() {
  flag = false;
  let val = search.value.toLowerCase();
  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/exterior`
  );
  let data = await res.json();

  let filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(val)
  );

  container.innerHTML = "";
  displayContent(filteredData);
}
