const overview = document.querySelector(".overview");
const username = "taylorbeee";
const ul = document.querySelector("ul.repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const button = document.querySelector("button.view-repos");
const filterInput = document.querySelector(".filter-repos");


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
    fetchRepo();
};

const fetchRepo = async function () {
    const result = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repo = await result.json();
    // console.log(repo);
    fillRepoInfo(repo);
};

const fillRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        ul.append(li);
    }
};

const repoList = ul.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText
        repoInfo(repoName);
    }
});

const repoInfo = async function (repoName) {
    const result = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await result.json();
    // console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        // console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(newDiv);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    button.classList.remove("hide");
};

button.addEventListener("click", function () {
    repos.classList.remove("hide");
    button.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const inputValue = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerText = inputValue.toLowerCase();
    for (const repo of repos) {
        const innerLowerValue = repo.innerText.toLowerCase();
        if (innerLowerValue.includes(lowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});