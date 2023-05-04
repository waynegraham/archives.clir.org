document.addEventListener('DOMContentLoaded', function(event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let data = [];
    let search_term = '';

  
    fetch('/archives.clir.org/assets/js/search.json')
      .then(response => response.json())
      .then(data_server => {
        data = data_server;
      });

      console.log('search', search);
  
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
        li.className = 'list-group-item list-group-action';
        li.innerHTML = `No results found 😢`;
        results.appendChild(li);
      }
      result.forEach(e => {
        // const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', e.url);
        a.setAttribute('class', 'list-group-item list-group-action');
        a.append(e.title);
        // li.className = 'list-group-item';
        // li.innerHTML = `<a class="list-group-item" href="${e.url}">${e.title}</a>`;
        // results.appendChild(li);
        results.appendChild(a);
      });
    };
  });