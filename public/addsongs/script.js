// const logOutButton = document.querySelector("#logout")
// const query = window.location.search.split("=");
// console.log(query);
// const idAlbum = query[1]
// console.log(idAlbum);


// const getAlbum = async () => {
//   try {
//     const { data } = await axios.get(`../../album1/${idAlbum}`);
//     album = data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// getAlbum();

// const addSong = async (e) => {
//   e.preventDefault();
//   const objectToSend = getInputValues();
 
//   try {
//     await axios.put(`../song/${idAlbum}`, objectToSend);
//     await swal("cancion agregada correctamente");
//     window.location.href = "../index.html"
//   } catch (error) {
//     swal("Error al agregar la cancion");
//   }
// };

// agregarSong.addEventListener("click", (e) => {
//   addSong(e);
// });

// // logOutButton.addEventListener("click", () => {
// //   logOut()
// // })

const query = window.location.search.split("=");
const idAlbum = query[1];
let album;
const agregarSong = document.querySelector("#agregar");

const redirect = (id) => {
  window.location.href = `../Album/Album.html?album=${id}`;
};

// Generamos una funcion para guardar los valores que ingresa el usuario
function getInputValues() {
  // Obtener los input del form
  const titleInput = document.getElementById("titulo");
  const duracionInput = document.getElementById("duracion");
  const linkInput = document.getElementById("link");

  // Obtener los valores de los campos de entrada
  const titleValue = titleInput.value;
  const duracionValue = duracionInput.value;
  const linkValue = linkInput.value;

  // Devolver los valores en un objeto
  return {
    titulo: titleValue,
    duracion: duracionValue,
    link: linkValue,
  };
}

const getAlbum = async () => {
  try {
    const { data } = await axios.get(`../../../album/${idAlbum}`);
    album = data;
  } catch (error) {
    console.log(error);
  }
};

getAlbum();

const addSong = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  try {
    await axios.put(`../../../song/${idAlbum}`, objectToSend);
    await swal({
      title: "Canción agregada correctamente!",
      text: `Canción: ${objectToSend.titulo}`,
      icon: "success",
    });
    window.location.href = `../Album/Album.html?album=${idAlbum}`;
  } catch (error) {
    console.log(error);
    swal("Error al agregar la canción");
  }
};

agregarSong.addEventListener("click", (e) => {
  addSong(e);
});