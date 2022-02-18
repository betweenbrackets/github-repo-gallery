const profileInformation = document.querySelector(".overview");
const username = "betweenbrackets";

// Fetch the user's data from the GitHub API

const getData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    console.log(data);

    displayData(data);
};
getData(); 

// Display the fetched user data on the page

const displayData = function (data) {
    const createDiv = document.createElement("div");
    createDiv.classList.add("user-info");
    createDiv.innerHTML = 
    `<figure>
        <img alt = "user avatar" src=${data.avatar_url}
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;

    profileInformation.append(createDiv);
};