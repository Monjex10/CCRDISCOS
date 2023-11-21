const query = window.location.search.split("=");
const idAlbum = query[1]

let album;
const agregarSong = document.querySelector("#agregar");

const redirect = (id) => {
  window.location.href = `../album1/album1.html?album=${id}`;
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

const addSong = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
 
  try {
    await axios.put(`../song/${idAlbum}`, objectToSend);
    console.log(cancion);
    await swal({
      title: "Cancion agregada correctamente!",
      // text: `Álbum: ${album.data.titulo}`,
      icon: "success",
      button: "Continuar",
    });
    window.location.href= "../album1/album1.html"
  } catch (error) {
    swal("No se pudo agregar el álbum, inténtelo nuevamente");
  }};

agregarSong.addEventListener("click", (e) => {
  addSong(e);
});

const getAlbum = async () => {
  try {
    const response = await axios.get(`../album/${idAlbum}`)
    console.log(idAlbum);
  } catch (error) {
    console.log(error);
  }
}
// const getAlbum = async () => {
//   try {
//     const { data } = await axios.get(`../album/${idAlbum}`);
//     album = data;
//   } catch (error) {
//     console.log(error);
//   }
// };
  
getAlbum();

