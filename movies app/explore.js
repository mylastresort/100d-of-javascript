const api = '04c35731a5ee918f014970082a0088b1';
const sort = 'popularity.desc'
const discover = `https://api.themoviedb.org/3/discover/tv?api_key=${api}&sort_by=${sort}&with_genres=`
const genre = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api}`;
const body = document.body;
const imgurl = 'https://image.tmdb.org/t/p/w1280';
const search = type => { return `https://api.themoviedb.org/3/search/${type}?api_key=${api}&query=` }


window.onload = _ => {
  fetch(genre)
    .then(responce => responce.json())
    .then(data => {
      let explore = document.createElement('div');
      explore.setAttribute('id', 'explore');
      body.insertBefore(explore, document.getElementById('searchResult'))
      //making the catagory containers for each genre available
      data.genres.forEach((genre, index) => {
        const catagory = document.createElement('div');
        const section = document.createElement('span');
        const option = document.createElement('span');
        const result = document.createElement('div');
        catagory.setAttribute('id', 'category');
        section.textContent = genre.name;
        section.setAttribute('id', genre.id);
        section.classList = 'genre';
        result.setAttribute('id', 'result');
        option.setAttribute('id', 'more');
        option.onclick = more;
        option.textContent = 'See all >';
        catagory.appendChild(section);
        catagory.appendChild(option);
        //making the demos of each catagory
        catagory.appendChild(result);
        fetch(`${discover}${genre.id}`)
          .then(responce => responce.json())
          .then(demos => {
            for (let i = 0; i < 6; i++) {
              const demo = document.createElement('span');
              const img = document.createElement('img');
              const add = document.createElement('div');
              const reference = document.createElement('div');
              demo.setAttribute('id', 'demo');
              img.setAttribute('alt', 'poster-unavailable');
              img.setAttribute('src', `${imgurl}${demos.results[i].poster_path}`)
              reference.textContent = demos.results[i].name;
              reference.classList = 'reference';
              add.setAttribute('id', 'add');
              add.textContent = 'Add';
              demo.appendChild(add);
              demo.appendChild(img);
              demo.appendChild(reference);
              document.querySelectorAll('#result')[index].appendChild(demo);
            }
          })
          .catch(err => console.log(err))
        //appending the categories
        document.getElementById('explore').appendChild(catagory);
      });
    })
    .catch(err => console.log(err))
}

document.getElementById('search').oninput = _ => {
  if (document.getElementById('search').value.length < 3) {
    document.getElementById('explore').style.display = 'block';
    document.getElementById('searchResult').innerHTML = '';
  } else {
    document.getElementById('explore').style.display = 'none';
    document.getElementById('searchResult').innerHTML = '';
    const value = document.getElementById('search').value;
    fetch(`${search('movie')}${value}`)
      .then(res => res.json())
      .then(data => show(data))
      .catch(e => console.log(e))
  }
}

function show(data) {
  let counter = 0;
  let loading = setInterval(_ => {
    let empty = document.getElementById('searchResult').childNodes.length ? false : true;
    if (empty || (data.results.length > document.getElementById('searchResult').childNodes.length)) {
      const demo = document.createElement('span');
      const img = document.createElement('img');
      const add = document.createElement('div');
      const reference = document.createElement('div');
      demo.setAttribute('id', 'demoSearched');
      img.setAttribute('alt', 'poster-unavailable');
      img.setAttribute('src', `${imgurl}${data.results[counter].poster_path}`)
      reference.textContent = data.results[counter].title;
      reference.classList = 'reference';
      add.setAttribute('id', 'add');
      add.textContent = 'Add';
      demo.appendChild(add);
      demo.appendChild(img);
      demo.appendChild(reference);
      document.getElementById('searchResult').appendChild(demo)
      counter++;
    } else {
      clearInterval(loading)
    }
  }, 125)
}


function more(arg) {
  const genreSearched = arg.target.parentElement.childNodes[0].id;
  fetch(`${discover}${genreSearched}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('explore').style.display = 'none';
      document.getElementById('searchResult').innerHTML = '';
      show(data);
    })
    .catch(err => console.log(err))
  document.getElementById('return').style.display = 'block';
}


document.getElementById('return').onclick = _ => {
  document.getElementById('explore').style.display = 'block';
  document.getElementById('searchResult').innerHTML = '';
  document.getElementById('return').style.display = 'none';
}