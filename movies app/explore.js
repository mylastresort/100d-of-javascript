const api = '04c35731a5ee918f014970082a0088b1';
const sort = 'popularity.desc'
const discover = `https://api.themoviedb.org/3/discover/tv?api_key=${api}&sort_by=${sort}&with_genres=`
const genre = `https://api.themoviedb.org/3/genre/tv/list?api_key=${api}`;
const body = document.body;
const imgurl = 'https://image.tmdb.org/t/p/w1280';

fetch(genre)
  .then(responce => responce.json())
  .then(data => {
    let explore = document.createElement('div');
    explore.setAttribute('id','explore');
    body.appendChild(explore);
    //making the catagory containers for each genre available
    data.genres.forEach((genre, index) => {
      const catagory = document.createElement('div');
      const section = document.createElement('span');
      const option = document.createElement('span');
      const result = document.createElement('div');
      catagory.setAttribute('id', 'category');
      section.textContent = genre.name;
      section.setAttribute('id', 'genre');
      result.setAttribute('id', 'result');
      option.setAttribute('id', 'more');
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
            img.setAttribute('alt', 'poster');
            img.setAttribute('src', `${imgurl}${demos.results[i].poster_path}`)
            reference.textContent = demos.results[i].name;
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