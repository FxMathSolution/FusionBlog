// Fetch the search data
fetch('/search.json')
  .then(response => response.json())
  .then(data => {
    // Initialize Lunr.js
    const idx = lunr(function () {
      this.ref('url');
      this.field('title');
      this.field('content');

      data.forEach(post => {
        this.add(post);
      });
    });

    // Get elements
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Handle search input
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      const results = idx.search(query);

      // Clear previous results
      searchResults.innerHTML = '';

      // Display new results
      results.forEach(result => {
        const post = data.find(p => p.url === result.ref);
        searchResults.innerHTML += `
          <li>
            <a href="${post.url}">${post.title}</a>
            <p>${post.content.substring(0, 100)}...</p>
          </li>
        `;
      });
    });
  });