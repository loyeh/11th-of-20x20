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
  window.addEventListener("scroll", handleScrollEnd);
}
// let y = 0;
// document.onscroll = function () {
//   console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
// };

function handleScrollEnd(ev) {
  // innerheight.innerHTML = `${window.innerHeight} + ${window.visualViewport.pageTop}  =  ${window.innerHeight + window.visualViewport.pageTop} </br> offsetHeight = ${document.body.offsetHeight}`;
  clearTimeout(myTimeOut);
  postFilter.value = "";
  if (Math.floor(window.innerHeight + window.scrollY) + 1 >= document.body.offsetHeight) {
    window.removeEventListener("scroll", handleScrollEnd);
    loader.classList.add("show");
    post_creator();
  }
}

function searchPosts() {
  const searchPhrase = postFilter.value;
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => post.classList.remove("hidden"));
  posts.forEach((post) => {
    if (!post.childNodes[0].innerText.includes(searchPhrase) && !post.childNodes[1].innerText.includes(searchPhrase)) {
      post.classList.add("hidden");
    }
  });
  console.log(posts[0].childNodes);
}

//event listeners
postFilter.addEventListener("input", searchPosts);
