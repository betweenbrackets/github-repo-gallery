const profileInformation = document.querySelector(".overview");
const username = "betweenbrackets";
const repoList = document.querySelector(".repo-list");

// Fetch the user's data from the GitHub API

const getProfile = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);

    const profile = await response.json();

    console.log(profile);

    displayProfile(profile);
};
getProfile(); 

// Display the fetched user data on the page

const displayProfile = function (profile) {
    const createDiv = document.createElement("div");
    createDiv.classList.add("user-info");
    createDiv.innerHTML = 
    `<figure>
        <img alt = "user avatar" src=${profile.avatar_url}
    </figure>
    <div>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Bio:</strong> ${profile.bio}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>
    `;

    profileInformation.append(createDiv);

    getRepos();
};

// Fetch the public repos

const getRepos = async function () {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    const repos = await response.json();

    console.log(repos); 

    displayRepos(repos);
};
// getRepos(); 

// Display the Info About Your Repos

const displayRepos = function (repos) {
// repos is an array of objects so iterate on a single repo
    for (const repo of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add(".repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`
        // global variable for <ul class="repo-list"></ul>
        repoList.append(listItem)
    }
};
