document.addEventListener('DOMContentLoaded', function(event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let data = [];
    let search_term = '';

    console.log(search);
  
    fetch('/11ty-tutorial/assets/js/search.json')
      .then(response => response.json())
      .then(data_server => {
        data = data_server;
      });
  
    search.addEventListener('input', event => {
      search_term = event.target.value.toLowerCase();
      showList();
    });
  
    const showList = () => {
      results.innerHTML = '';
      if (search_term.length <= 0) return;
      const match = new RegExp(`${search_term}`, 'gi');
      let result = data.filter(name => match.test(name.title));
      if (result.length == 0) {
        const li = document.createElement('li');
        li.innerHTML = `No results found 😢`;
        results.appendChild(li);
      }
      result.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="list-group-item" href="${e.url}">${e.title}</a>`;
        results.appendChild(li);
      });
    };
  });