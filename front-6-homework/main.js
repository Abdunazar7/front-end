// POSTS
const postsBox = document.getElementById("posts");
const loadMoreBtn = document.getElementById("loadMore");

let postsData = [];
let postsIndex = 0;

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((json) => {
    postsData = json;
    console.log(postsData)
    renderPosts();
  });

function renderPosts() {
  const slice = postsData.slice(postsIndex, postsIndex + 25);

  slice.forEach((post) => {
    postsBox.innerHTML += `
      <div class="bg-slate-700 p-3 rounded">
        <p class="font-bold">${post.title}</p>
        <p>${post.body}</p>
      </div>
    `;
  });

  postsIndex += 25;

  if (postsIndex >= postsData.length) {
    loadMoreBtn.style.display = "none";
  }
}

loadMoreBtn.onclick = () => renderPosts();

// USERS
const usersBox = document.getElementById("users");
const toggleBtn = document.getElementById("toggleUsers");

let usersData = [];
let isGrid = false;

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((json) => {
    usersData = json;
    console.log(usersData)
    renderUsers();
  });

function renderUsers() {
  usersBox.innerHTML = "";

  if (isGrid) {
    usersBox.className = "grid grid-cols-3 gap-3";
  } else {
    usersBox.className = "space-y-2";
  }

  usersData.forEach((user) => {
    usersBox.innerHTML += `
      <div class="bg-slate-700 p-3 rounded">
        <p class="font-bold">${user.name}</p>
        <p>${user.phone}</p>
      </div>
    `;
  });
}

toggleBtn.onclick = () => {
  isGrid = !isGrid;
  toggleBtn.textContent = isGrid ? "List" : "Grid";
  renderUsers();
};
