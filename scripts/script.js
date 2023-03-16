let getRepos = async (url, searchInput, limit, container) => {
  let response = await fetch(`${url}${searchInput}&per_page=${limit}`).then(
    (resolve) => resolve.json()
  );

  container.innerHTML = "";

  let reps = response.items;

  if (reps.length == 0) {
    let message = document.createElement('p')
    message.innerText = "No results found."
    message.classList.add('error')
    container.appendChild(message)
  } else {
    for (const rep of reps) {
      let el = document.createElement("div");
      el.innerHTML = `<div class='repository__card'><h3>Name: <a target="_blank" class="repository__link" href="${rep.html_url}">${rep.name}</a></h3><p class="repository__description">Description: ${rep.description}</p><h3>Owner:</h3><a target="_blank" href="${rep.owner.html_url}"><img class="repository__owner" src="${rep.owner.avatar_url}"/></a><p class="repository__stars">Stars: <i class="fa-solid fa-star"></i>${rep.stargazers_count}</p></div>`;
      container.appendChild(el);
    }
  }
};

let form = document.querySelector("#search__form");
let container = document.querySelector(".repositories");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getRepos(
    "https://api.github.com/search/repositories?q=",
    form.search.value,
    10,
    container
  );
});
