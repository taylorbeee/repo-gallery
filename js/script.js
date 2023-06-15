const overview = document.querySelector(".overview");
const username = "taylorbeee"

const getGitProfile = async function () {
    const result = await fetch(`https://api.github.com/users/${username}`);
    const gitData = await result.json();
    displayInfo(gitData);
};

getGitProfile();

const displayInfo = function (gitData) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${gitData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${gitData.name}</p>
    <p><strong>Bio:</strong> ${gitData.bio}</p>
    <p><strong>Location:</strong> ${gitData.location}</p>
    <p><strong>Number of public repos:</strong> ${gitData.public_repos}</p>`
    overview.append(newDiv);
};