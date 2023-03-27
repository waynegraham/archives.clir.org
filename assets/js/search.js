// using proxy is facter than Object.fromEntries()
// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let query = params.q;

function displaySearchResults(results) {
    let searchResults = document.getElementById('search-results');

    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const options = {
        year: "numeric",
        month: "long"
    };

    if(results.length) {

        displaySearchCount(results.length)

        let appendString='';

        for(var i = 0; i < results.length; i++){
            let item = store[results[i].ref];
            // TODO: mustach template
            let date = new Date(item.pub_date).toLocaleString('en-US', options);

            appendString += '<p><a href="' + item.url + '">' + item.title + '</a> by ' + item.authors + '. ' + date + '. ' + item.clir_id + '.</p>';
        }
        searchResults.innerHTML = appendString;


    } else {
        searchResults.innerHTML = '<li>No results found</li>';
    }
}

function displaySearchCount(results){
    let searchCount = document.getElementById('search-count');
    searchCount.innerHTML = '<p>' + results + ' results found.</p>';
}

if(query) {
    // set search box value
    document.getElementById('search-box').setAttribute('value', query);

    var idx = lunr.Index.load(search_index); // search pre-build search index
    let results = idx.search(query); // return lunr search object

    displaySearchResults(results);
}
