const inputSearch = document.querySelector(".form-group input");
const liste = document.querySelector(".liste-poke");
const chargement = document.querySelector(".loader");

let allPoke = [];
let tabPokeFin = [];

const types = {
  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
};

function apiPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((tousLesPoke) => {
      // console.log(tousLesPoke.results);
      tousLesPoke.results.forEach((pokemon) => {
        //   console.log(pokemon);
        detailsPoke(pokemon);
      });
    });
}
apiPokemon();

function detailsPoke(pokemon) {
  let objPoke = {};
  let url = pokemon.url;
  let namePoke = pokemon.name;
  //   console.log(pokemon);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.id);
      objPoke.picture = data.sprites.front_default;
      objPoke.type = data.types[0].type.name;
      objPoke.id = data.id;

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePoke}`)
        .then((response) => response.json())
        .then((pokeData) => {
          //  console.log(pokeData.names[4].name);
          objPoke.name = pokeData.names[4].name;
          allPoke.push(objPoke);
          //  console.log(allPoke);
          if (allPoke.length === 151) {
            tabPokeFin = allPoke
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);
            creerCarte(tabPokeFin);
            chargement.style.display = "none";
          }
        });
    });
}

// affichage de la liste des pokemons
function creerCarte(tab) {
  for (let i = 0; i < tab.length; i++) {
    const couleur = types[tab[i].type];
    //  console.log(tab[i].type);
    const item = document.createElement("li");
    const title = document.createElement("h5");
    item.style.background = couleur;
    title.innerText = tab[i].name;
    const img = document.createElement("img");
    const txt = document.createElement("p");
    txt.innerText = `ID# ${tab[i].id}`;
    img.src = tab[i].picture;

    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(txt);
    liste.appendChild(item);
  }
}

// Implementation de la fonction scroll infinie
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  // console.log(document.documentElement);
  console.log(scrollHeight, scrollTop, clientHeight);
  if (clientHeight + scrollTop >= scrollHeight - 20) {
    addPoke(6);
  }
});

let index = 21;

// Ajout de carte
function addPoke(nb) {
  if (index > 151) {
    return;
  }
  const tabCarteAAjouter = allPoke.slice(index, index + nb);

  creerCarte(tabCarteAAjouter);
  index += nb;
}

// Implementation de la fonction recherche de Pokemon

inputSearch.addEventListener("keyup", recherche);

function recherche() {
  if (index < 151) {
    addPoke(130);
  }
  let inputValue, tousLesLi, tousLesTitres, titleValue;
  inputValue = inputSearch.value.toUpperCase();
  tousLesLi = document.querySelectorAll("li");
  tousLesTitres = document.querySelectorAll("li > h5");

  for (let i = 0; i < tousLesLi.length; i++) {
    titleValue = tousLesTitres[i].innerText;
    // console.log(tousLesTitres[i].innerText);
    if (titleValue.toUpperCase().indexOf(inputValue) > -1) {
      tousLesLi[i].style.display = "flex";
    } else {
      tousLesLi[i].style.display = "none";
    }
  }
}

// Animation input and label
inputSearch.addEventListener("input", (e) => {
  // console.log(e.target.parentNode);
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active");
  } else {
    e.target.parentNode.classList.remove("active");
  }
});
