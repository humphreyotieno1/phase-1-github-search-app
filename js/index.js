document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    
    githubForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(username) {
      const userSearchEndpoint = `https://api.github.com/search/users?q=${username}`;
  
      fetch(userSearchEndpoint, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
  
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login} avatar" />
          <p>${user.login}</p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        userItem.addEventListener('click', function () {
          getUserRepos(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    function getUserRepos(username) {
      const reposEndpoint = `https://api.github.com/users/${username}/repos`;
  
      fetch(reposEndpoint, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => console.error('Error fetching repositories:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
          <p>${repo.name}</p>
          <p>${repo.description || 'No description'}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });  