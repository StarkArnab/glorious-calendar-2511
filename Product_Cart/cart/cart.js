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

    // img_card.style.backgroundImage = `url(${element.image})`;
    // img_card.style.backgroundSize = "content-box";
    // img_card.style.backgroundPosition = "center";

    let body = document.createElement("div");
    body.classList.add("card-body");

    let nama = document.createElement("h3");
    nama.classList.add("nama");
    nama.textContent = element.name;

    let price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `₹${element.price}`;

    let click_collect = document.createElement("h5");
    click_collect.style.margin = "0 10px";
    click_collect.classList.add("dummy");
    click_collect.textContent = `Click & Collect`;

    let home_del = document.createElement("h5");
    home_del.style.margin = "0 10px";
    home_del.classList.add("dummy");
    home_del.textContent = `Home Delivery`;

    let icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-tag fa-flip-horizontal");

    let qty = document.createElement("select");
    qty.classList.add("qty");
    qty.setAttribute("id", "qty");

    const labelElement = document.createElement("label");
    labelElement.classList.add("label");
    labelElement.setAttribute("for", "qty");
    labelElement.textContent = "Quantity";

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
    let icon1 = document.createElement("i");
    icon1.setAttribute("class", "fa-solid fa-trash");
    remove.append(icon1);

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
        totalAmount();
        coup();
      } catch (error) {
        console.log(error.message);
      }
    });

    img_card.append(img);
    body.append(
      nama,
      icon,
      price,
      click_collect,
      home_del,
      labelElement,
      qty,
      remove
    );

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
  coup();
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
  coup();
  pay_able();
});

function coup() {
  setTimeout(() => {
    let val = coupon.value;
    if (val == coupon1 || val == coupon2) {
      let temp = +toatl_Amount.textContent;
      discount_val.textContent = Math.round((10 / 100) * temp);
    } else {
      discount_val.textContent = 0;
    }
  }, 1000);
}

let rupee_ship = document.getElementById("rupee_ship");

function pay_able() {
  setTimeout(() => {
    let temp1 = +toatl_Amount.textContent;
    let temp2 = +discount_val.textContent;
    console.log(temp1, "  ", temp2);
    if (temp1 > 1) {
      rupee_ship.textContent = 200;
    }
    payable.textContent = Math.round(temp1 - temp2 + 200);
    localStorage.setItem(
      "Total_price",
      JSON.stringify(Math.round(temp1 - temp2 + 200))
    );
  }, 1200);
}

//overlay

const openPopupButton = document.getElementById("openPopup");
const closePopupButton = document.getElementById("closePopup");
const addressPopup = document.getElementById("addressPopup");
const overlay = document.createElement("div");
overlay.className = "overlay";

openPopupButton.addEventListener("click", () => {
  addressPopup.style.display = "block";
  overlay.style.display = "block";
  document.body.appendChild(overlay);
});

closePopupButton.addEventListener("click", () => {
  addressPopup.style.display = "none";
  overlay.style.display = "block";
  document.body.removeChild(overlay);
});

overlay.addEventListener("click", function () {
  addressPopup.style.display = "none";
  document.body.removeChild(overlay);
});

let form = document.querySelector("form");
let pin_holder = document.getElementById("pin_holder");
let head_pin = document.getElementById("head_pin");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addressPopup.style.display = "none";
  document.body.removeChild(overlay);
  let val = event.target.pin_holder.value;

  head_pin.textContent = `Pin Code: ${val}`;
  head_pin.style.display = "block";
});

let pay = document.getElementById("check");
pay.addEventListener("click", () => {
  let total = JSON.parse(localStorage.getItem("Total_price"));
  console.log(total);
  var options = {
    key: "rzp_test_yMVGTQKGP3oobU", // Enter the Key ID generated from the Dashboard
    amount: total + "00",
    currency: "INR",
    description: "Acme Corp",
    image: "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
    prefill: {
      email: "gaurav.kumar@example.com",
      contact: +919900000000,
    },
    config: {
      display: {
        blocks: {
          utib: {
            //name for Axis block
            name: "Pay using Axis Bank",
            instruments: [
              {
                method: "card",
                issuers: ["UTIB"],
              },
              {
                method: "netbanking",
                banks: ["UTIB"],
              },
            ],
          },
          other: {
            //  name for other block
            name: "Other Payment modes",
            instruments: [
              {
                method: "card",
                issuers: ["ICIC"],
              },
              {
                method: "netbanking",
              },
            ],
          },
        },
        hide: [
          {
            method: "upi",
          },
        ],
        sequence: ["block.utib", "block.other"],
        preferences: {
          show_default_blocks: false, // Should Checkout show its default blocks?
        },
      },
    },
    handler: function (response) {
      //alert(response.razorpay_payment_id);
      window.location.href = "index.html";
    },
    modal: {
      ondismiss: function () {
        if (confirm("Are you sure, you want to close the form?")) {
          txt = "You pressed OK!";
          console.log("Checkout form closed by the user");
        } else {
          txt = "You pressed Cancel!";
          console.log("Complete the Payment");
        }
      },
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
});
