let items = document.getElementById("items");
let totalItem = document.getElementById("totalItem");
let toatl_Amount = document.getElementById("toatlAmount");
let apply_coup = document.getElementById("apply");
let coupon = document.getElementById("coupon");
let discount_val = document.getElementById("discount-val");
let payable = document.getElementById("payable");

async function fetchItem() {
  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/cart`
  );
  let data = await res.json();
  console.log(data);

  displayData(data);
  totalAmount();
}

fetchItem();

function displayData(data) {
  items.innerHTML = "";
  totalItem.textContent = data.length;

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

    let price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `₹${element.price}`;

    let qty = document.createElement("select");
    qty.classList.add("qty");

    const optionData = [
      { value: "1", text: "1" },
      { value: "2", text: "2" },
      { value: "3", text: "3" },
      { value: "4", text: "4" },
      { value: "5", text: "5" },
      { value: "6", text: "6" },
      { value: "7", text: "7" },
      { value: "8", text: "8" },
      { value: "9", text: "9" },
    ];

    optionData.forEach((optionInfo) => {
      const option = document.createElement("option");
      option.value = optionInfo.value;
      option.text = optionInfo.text;

      qty.appendChild(option);
    });

    qty.value = element.qty;
    qty.addEventListener("change", function (event) {
      event.preventDefault();
      let val = +qty.value;
      qty_change(element, val);
    });

    let remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = "Remove";
    remove.addEventListener("click", async function () {
      try {
        let res = await fetch(
          `https://mock-server-team-masai-blvy.onrender.com/cart/${element.id}`,
          {
            method: "DELETE",
          }
        );
        let res1 = await fetch(
          `https://mock-server-team-masai-blvy.onrender.com/cart`
        );
        let data = await res1.json();
        displayData(data);
      } catch (error) {
        console.log(error.message);
      }
    });

    img_card.append(img);
    body.append(nama, price, qty, remove);

    card.append(img_card, body);
    items.append(card);
  });
}

async function qty_change(element, val) {
  let user = { qty: val };
  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/cart/${element.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  totalAmount();
}

async function totalAmount() {
  let res = await fetch(
    `https://mock-server-team-masai-blvy.onrender.com/cart`
  );
  let data = await res.json();

  let total = 0;
  data.forEach((element) => {
    let temp = +element.qty * +element.price;
    total += temp;
  });
  toatl_Amount.textContent = total;
  pay_able();
}

let coupon1 = "REALDEAL100";
let coupon2 = "SPECIAL100";

apply_coup.addEventListener("click", function () {
  let val = coupon.value;

  if (val == coupon1 || val == coupon2) {
    let temp = +toatl_Amount.textContent;
    discount_val.textContent = Math.round((10 / 100) * temp);
  }

  pay_able();
});

function pay_able() {
  let temp1 = +toatl_Amount.textContent;
  let temp2 = +discount_val.textContent;
  console.log(temp1, "  ", temp2);
  payable.textContent = Math.round(temp1 - temp2 - 40);
}
