const main = document.getElementById("main");
const loader = document.getElementById("loader");
const innerheight = document.getElementById("innerheight");
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
      myTimeOut = setTimeout(() => {
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

function handleScrollEnd(ev) {
  innerheight.innerHTML = `${window.innerHeight} + ${Math.floor(window.scrollY)}  =  ${window.innerHeight + Math.floor(window.scrollY)} </br> offsetHeight = ${document.body.offsetHeight}`;
  clearTimeout(myTimeOut);

  if (Math.floor(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    loader.classList.add("show");
    post_creator();
  }
}

window.addEventListener("scroll", handleScrollEnd);
