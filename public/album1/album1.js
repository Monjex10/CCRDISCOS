
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

  // // agregamos los estilos
  // spanSongTitle.classList.add("tituloCancion");
  // spanSongDuration.classList.add("duracionCancion");
  // spanSongIcon.classList.add("iconosCancion");
  // iconTrash.classList.add("fas");
  // iconTrash.classList.add("fa-trash-alt");
  // iconTrash.setAttribute("id", "delete");
  // iconMusic.classList.add("fas");
  // iconMusic.classList.add("fa-music");

  // agregamos la info de las canciones
  spanSongTitle.textContent = album.titulo;
  spanSongDuration.textContent = album.duracion;
  numCancion++;

  // agregamos los elementos al HTML
  li.appendChild(spanSongTitle);
  li.appendChild(spanSongDuration);
  spanSongIcon.appendChild(iconTrash);
  spanSongIcon.appendChild(iconMusic);
  li.appendChild(spanSongIcon);
  ul.appendChild(li);

  // agregamos el addEventListener
  iconMusic.addEventListener("click", () => {
    window.open(album.link, "_blank");
  });
}


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



const onLoad = async () => {
  try {
    const response = await axios.get("../../../me");
    nombre.textContent = `Hola, ${response.data.nombre} ${response.data.apellido}`;
  } catch (error) {
    console.log(error.message);
    // window.location.href = "../index.html";
  }
};
const logOut = async () => {
  try {
    const response = await axios.post("../../logout");
  } catch (error) {
    console.log(error.message);
  }
};

const Logout = document.getElementById("logout");

Logout.addEventListener("click", () => {
  logOut();
  window.location.href = "./login/login.html";
});

const editar = document.querySelector("#editar");
const ico = document.querySelector("#eliminar");
editar.addEventListener("click", () => {
  ico.classList.toggle("eliminar");
});

onLoad();

const getAlbum = async () => {
  try {
    const response = await axios.get(`../album/${idAlbum}`)
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}



