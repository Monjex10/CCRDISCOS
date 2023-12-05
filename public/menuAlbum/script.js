const nombre = document.querySelector("#nombre-usuario");
const redirect = (id) => {
  window.location.href = `../album1/album1.html?album=${id}`
}


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

const divAlbums = document.querySelector(".albums");

const renderAlbums = (album) => {
  const div = document.createElement("div");
  const imgAlbum = document.createElement("img");
  const iconTrash = document.createElement("i");

  div.classList.add("albums-individual");
  let urlPortada = album.portada
    ? album.portada
    : "https://imgur.com/0uSALUr.png";
  imgAlbum.setAttribute("src", urlPortada);
  iconTrash.classList.add("fas");
  iconTrash.classList.add("fa-trash-alt");
  iconTrash.classList.add("trash");


  imgAlbum.addEventListener("click", () => {
    redirect(album._id);
  });
  div.appendChild(imgAlbum);
  div.appendChild(iconTrash);
  divAlbums.appendChild(div);
};
  
  
const getAlbums = async () => {
  try {
    const response = await axios.get("../album/todos");
    response.data.map((album) => {
      renderAlbums(album);
    });
    const trash = document.querySelectorAll("i");
    trash.forEach((icon, index) => {
      icon.addEventListener("click", () => {
        deleteAlbum(response.data[index]._id);
        location.reload();
      });
    });
  } catch (error) {
    console.log(error);
  }
};
  
  getAlbums();

  const logOut = async () => {
    try {
      const response = await axios.post("../../logout");
      window.location.href = "../login/login.html";
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const Logout = document.getElementById("logout");
  
  Logout.addEventListener("click", () => {
    logOut();
    window.location.href = "./login/login.html";
  });
  
const deleteAlbum = async (album) => {
  try {
    await axios.delete(`../album/${album}`);
    await swal("Vas a eliminar el album, estas seguro?");
    await swal("album eliminado correctamente");
    const albums = document.querySelectorAll(".albums-individual");
    albums.forEach((album) => album.remove());
    const response = await axios.get("../../album/todos");
    response.data.map((album) => {
      renderAlbums(album);
    });
  } catch (error) {
    console.log(error.message);
  }
};
