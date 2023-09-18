let index = localStorage.getItem("index");
let img_card = document.getElementById("img-card");
let nama = document.getElementsByClassName("nama");
let rating = document.getElementsByClassName("rating");
let price = document.getElementsByClassName("price");
let btn = document.getElementsByClassName("btn");
let description_body = document.getElementsByClassName("description-body");
let addCart = document.getElementById("addCart");

async function fetchData() {
  let res = await fetch(`http://localhost:3000/exterior/${index}`);
  let data = await res.json();
  updateData(data);
}

fetchData();

function updateData(data) {
  data.additional_images.forEach((element, index) => {
    let img_org = document.createElement("img");
    img_org.classList.add("img-org");
    img_org.src = element;
    img_org.style.left = `${index * 100}%`;
    img_card.append(img_org);
  });

  nama[0].textContent = data.name;
  let value = data.rating / data.total_rating;
  let val_1 = value.toFixed(1);
  rating[0].textContent = `${val_1}/5`;
  price[0].textContent = `₹${data.price}`;
  description_body[0].textContent = data.decscription;
}

//slider
let counter = 0;

const slideImg = () => {
  let slides = document.getElementsByClassName("img-org");

  if (counter >= slides.length) {
    counter = 0;
  }

  if (counter < 0) {
    counter = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    let element = slides[i];
    element.style.transform = `translateX(-${counter * 100}%)`;
  }
};

const goNext = () => {
  counter++;
  slideImg();
};

const goPrv = () => {
  counter--;
  slideImg();
};

addCart.addEventListener("click", async function () {
  let val = JSON.parse(localStorage.getItem("index"));

  let res = await fetch(`http://localhost:3000/cart`);
  let data = await res.json();

  let flag = true;
  data.forEach((el) => {
    if (el.id == val) {
      flag = false;
    }
  });

  let element_temp = await fetch(`http://localhost:3000/exterior/${val}`);

  let element = await element_temp.json();

  if (flag) {
    element.qty = 1;
    let res_add = await fetch(`http://localhost:3000/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(element),
    });
  }
});
