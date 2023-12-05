const divCanciones = document.querySelector("#canciones")
const botonAgregarCanciones = document.querySelector("#addSongs")

addSongs.addEventListener("click", () => {
  window.location.href = `../addsongs/addsongs.html?album=${idAlbum}`;
});

const query = window.location.search.split("=")
const idAlbum = query[1]
const nombre = document.querySelector("#nombre-usuario");

function renderSongs(album) {
  // creamos los elementos HTML
  const li = document.createElement("li");
  const spanSongTitle = document.createElement("span");
  const spanSongDuration = document.createElement("span");
  const spanSongIcon = document.createElement("span");
  const iconTrash = document.createElement("i");
  const iconMusic = document.createElement("i");
  const ul = document.createElement("ul")
  // // agregamos los estilos
  spanSongTitle.classList.add("spantitulo");
  spanSongDuration.classList.add("spanduracion");
  // spanSongIcon.classList.add("li");
  iconTrash.classList.add("fas");
  iconTrash.classList.add("fa-trash-alt");
  iconTrash.setAttribute("id", "delete");
  iconMusic.classList.add("fas");
  iconMusic.classList.add("fa-music");

  // agregamos la info de las canciones

  spanSongTitle.textContent = album.titulo;
  spanSongDuration.textContent = album.duracion;

  
  // numCancion++;

  // agregamos los elementos al HTML
  li.appendChild(spanSongTitle);
  li.appendChild(spanSongDuration);
  spanSongIcon.appendChild(iconTrash);
  spanSongIcon.appendChild(iconMusic);
  li.appendChild(spanSongIcon);
  ul.appendChild(li);
  divCanciones.appendChild(li);

  
  // agregamos el addEventListener
  iconMusic.addEventListener("click", () => {
    window.open(album.link, "_blank");
  });
}


// 
const getAlbum = async () => {
  try {
    const response = await axios.get(`../album/${idAlbum}`)
    console.log(response);
    response.data.canciones.map((cancion)=>{
      renderSongs(cancion);
    })
    const trash = document.querySelectorAll("#delete")
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteSong(idAlbum, response.data.canciones[i]._id);
        location.reload();
      });
    }
  } catch (error) {
    console.log(error);
  }
}

getAlbum();

const deleteSong = async (album, cancion) => {
  try {
    await axios.put(
      `../../../song/delete/${album}?idSong=${cancion}`
    );
    await swal("cancion eliminada correctamente");
    ul.innerHTML = ""; // limpia la lista actual
    const respuesta = await axios.get(`../../../album/${idAlbum}`);
    const canciones = respuesta.data.canciones;
    canciones.map((cancion, index) => {
      renderSongs(cancion, index);
    });
    const trash = document.querySelectorAll("#delete");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteSong(idAlbum, canciones[i]._id);
      });
    }
    } catch (error) {
    console.log(error);
  }
};

const logOut = async () => {
  try {
    const response = await axios.post("../../logout");
  } catch (error) {
    console.log(error.message);
  }
};

const onLoad = async () => {
  try {
    const response = await axios.get("../../../me");
    nombre.textContent = `Hola, ${response.data.nombre} ${response.data.apellido}`;
  } catch (error) {
    console.log(error.message);
    // window.location.href = "../index.html";
  }
};

onLoad();





