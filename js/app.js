const overlay = document.querySelector(".overlay");
const card_list = document.querySelector(".card-list");
// request
const request = new XMLHttpRequest();

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
request.open("GET", "http://localhost:3000/articles");
request.send();
// updateUI
function updateUI(data) {
  const ul = document.createElement("ul");
  const docFrag = document.createDocumentFragment();
  data.forEach((article) => {
    const li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML += `
    <h3 style='margin-bottom:20px;'><i>Title:</i>
    ${article.title}</h3>
    <p style='margin-bottom:15px;' ><i>Author:</i>
    ${article.author}</p>
    <a href=${`./article.html` + `?${article.id}`}>Read more</a>
    `;
    docFrag.appendChild(li);
  });
  ul.appendChild(docFrag);
  card_list.appendChild(ul);
}
