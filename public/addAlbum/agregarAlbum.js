const buttonAdd = document.querySelector(".add-button");

// Generamos una función para obtener los valores ingresados por el usuario
function getInputValues() {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("image");
  const anioLanzamientoInput = document.getElementById("anioLanzamiento");

  const titleValue = titleInput.value;
  const descriptionValue = descriptionInput.value;
  const imageValue = imageInput.value;
  const anioLanzamientoValue = anioLanzamientoInput.value;

  return {
    titulo: titleValue,
    descripcion: descriptionValue,
    portada: imageValue,
    anioLanzamiento: anioLanzamientoValue,
  };
}

const addAlbum = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  try {
    let album = await axios.post("../album/agregar", objectToSend);
    await swal({
      title: "Álbum agregado correctamente!",
      text: `Álbum: ${objectToSend.titulo}`,
      icon: "success",
      button: "Continuar",
    });
    window.location.href= "../menuAlbum/menualbum.html"
  } catch (error) {
    swal("No se pudo agregar el álbum, inténtelo nuevamente");
  }
};

buttonAdd.addEventListener("click", (e) => {
  addAlbum(e);
});
