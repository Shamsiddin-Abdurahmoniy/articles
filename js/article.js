// Elements
const id_element = document.getElementById("id");
const card_about = document.querySelector(".card-about");
const overlay = document.querySelector(".overlay");
// Location for each article
const query = window.location.search;
const id = query.slice(1);
id_element.textContent = id;
// request
const request = new XMLHttpRequest();
//
request.addEventListener("readystatechange", () => {
  if (request.readyState == 4 && request.status == 200) {
    const data = JSON.parse(request.responseText);
    overlay.classList.add("hidden");
    updateUI(data);
  } else if (request.readyState == 4) {
    overlay.classList.add("hidden");
    console.log("ERROR");
  } else {
    overlay.classList.remove("hidden");
  }
});
request.open("GET", `http://localhost:3000/articles/${id}`);
request.send();
// updateUi article
function updateUI(data) {
  console.log(data);
  card_about.innerHTML += `
  <div class="particular-card">
  <h1 style="margin-bottom: 40px">${data.title}</h1>
  <p style="margin-bottom: 30px">
   ${data.body}
  </p>
  <h4 style="font-weight: 500; color: red;margin-bottom:27px;"><i>Author: &nbsp</i>${
    data.author
  }</h4>
  <a href=${`./index.html`}>Go Back</a>
</div>
  `;
}
