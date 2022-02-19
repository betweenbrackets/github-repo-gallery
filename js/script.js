const profileInformation = document.querySelector(".overview");
const username = "betweenbrackets";
const repoList = document.querySelector(".repo-list");
const listOfRepos = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data")


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

// When the user clicks on the h3 element, the event handler will grab the element’s text and then pull the corresponding data for the repo with the same name. 
// global variable for <ul class="repo-list"></ul>
repoList.addEventListener("click", function (e) {
    
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText
        // console.log(repoName);
        getSelectedRepo(repoName);
        
    }
})

// Fetch the specific repo information

const getSelectedRepo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); // custom endpoint??
    const repoInfo = await fetchRepoInfo.json();
    // Fetch the languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    // Put the languageData Objects into an Array
    const languages = [];
    for (const language in languageData ) {
        languages.push(language);
        console.log(languages);
    }

    displaySpecificRepo(repoInfo, languages)
};

// Display the Specific Repo info

const displaySpecificRepo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    const createDiv = document.createElement("div");
    createDiv.innerHTML = 
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.main}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;

    individualRepoData.append(createDiv);
    individualRepoData.classList.remove("hide");
    listOfRepos.classList.add("hide");
};