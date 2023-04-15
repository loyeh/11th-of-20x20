const main = document.getElementById("main");
const postFilter = document.getElementById("postFilter");
let page_numbert = 1;
let myTimeOut;

fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
  .then((response) => response.json())
  .then((json) => {
    post_factory(json);
  });

function post_creator() {
  page_numbert++;
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page_numbert}`)
    .then((response) => response.json())
    .then((json) => {
      setTimeout(() => {
        post_factory(json);
      }, 2000);
    });
}
postFilter.addEventListener("input", post_creator);

function post_factory(array) {
  loader.classList.remove("show");

  array.forEach((object) => {
    const post = document.createElement("div");
    post.classList = "post";
    post.setAttribute("data-number", object.id);
    const title = document.createElement("div");
    title.className = "title";
    title.innerText = object.title;
    post.appendChild(title);
    const text = document.createElement("div");
    text.className = "text";
    text.innerText = object.body;
    post.appendChild(text);
    main.appendChild(post);
  });
}
// let y = 0;
// document.onscroll = function () {
//   console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
// };
window.onscroll = function (ev) {
  console.log(window.innerHeight + window.scrollY, document.body.offsetHeight);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const loader = document.getElementById("loader");
    loader.classList.add("show");
    post_creator();
  }
};
