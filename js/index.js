document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000/books';
    const userId = 1; // Simulate the current user id
  
    // Fetch and list books
    function fetchBooks() {
      fetch(BASE_URL)
        .then(response => response.json())
        .then(books => {
          const list = document.getElementById('list');
          books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = book.title;
            li.dataset.id = book.id; // Store book id
            li.addEventListener('click', () => showBookDetails(book));
            list.appendChild(li);
          });
        });
    }
  
    // Show book details
    function showBookDetails(book) {
      const showPanel = document.getElementById('show-panel');
      showPanel.innerHTML = `
        <img src="${book.thumbnail}" alt="${book.title}" />
        <h2>${book.title}</h2>
        <p>${book.description}</p>
        <ul id="users-list">
          ${book.users.map(user => `<li>${user.username}</li>`).join('')}
        </ul>
        <button id="like-button">${book.users.some(user => user.id === userId) ? 'Unlike' : 'Like'}</button>
      `;
      document.getElementById('like-button').addEventListener('click', () => toggleLike(book));
    }
  
    // Toggle like status
    function toggleLike(book) {
      const isLiked = book.users.some(user => user.id === userId);
      const updatedUsers = isLiked
        ? book.users.filter(user => user.id !== userId)
        : [...book.users, { id: userId, username: 'pouros' }]; // Assume 'pouros' is the username
  
      fetch(`${BASE_URL}/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: updatedUsers })
      })
        .then(response => response.json())
        .then(updatedBook => {
          showBookDetails(updatedBook);
        });
    }
  
    // Initial fetch
    fetchBooks();
  });
  