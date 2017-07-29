var searchTerm = '';
var data = {};
var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&indexpageids=&exintro=1&titles=';

var elSearchBtn = document.querySelector('#searchBtn');
var elSearchBar = document.querySelector('#searchTerm');
var elRandomBtn = document.querySelector('#randomBtn');
var elResultsList = document.querySelector('#output');
// var liNode = document.createElement('LI');

var randomSettings = {
  'async': true,
  'crossDomain': true,
  'dataType': 'jsonp',
  'url': 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&piprop=original%7Cname&origin=%2A&prop=extracts%7Cpageimages&generator=random&grnnamespace=0&indexpageids=&exintro=1',
  'type': 'GET'
};

function searchRequest(query) {
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      action: 'query',
      list: 'search',
      srsearch: query,
      srinfo: 'suggestion',
      srlimit: '9',
      format: 'json'
    },
    xhrFields: {
      withCredentials: true
    },
    success: displayResults
  });
}
window.onload = function() {
  elSearchBar.focus();
};

elSearchBtn.onclick = function(){searchRequest(document.querySelector('#searchTerm').value);};
elRandomBtn.onclick = function(){randomArticle();};

function displayResults(data) {
  elResultsList.innerHTML = '';
  let contents = '';
  for (let i = 0; i < data.query.search.length; i++) {
    const title = data.query.search[i].title;
    const url = `https://en.wikipedia.org/wiki/${title}`;
    const snippet = data.query.search[i].snippet;
    contents += `<a href="${url}" target="_blank"><li class="result-card slide-${(i + 1)}"><h3>${title}</h3><p>${snippet}</p></li></a>`;
        // contents += '<li class="result-card ' + 'slide-' + (i + 1) + '"><a href="' + url + '"><h3>' + title + '</h3><p>' + snippet + '</p></a></li>';
  }
  console.log(data);
  elResultsList.innerHTML = contents;
}

function randomArticle() {
  $.ajax(randomSettings).done(function(data) {
    console.log(data);
    console.log(randomSettings.url);
  });
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    searchRequest(document.querySelector('#searchTerm').value);
  }
});
