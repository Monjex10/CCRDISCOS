function getInputValues() {
  const nombreInput = document.getElementById("nombre"); // document.querySelector("#nombre")
  const apellidoInput = document.getElementById("apellido");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Obtener los valores de los campos de entrada
  const nombreValue = nombreInput.value;
  const apellidoValue = apellidoInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  // Devolver los valores en un objeto
  return {
    nombre: nombreValue,
    apellido: apellidoValue,
    email: emailValue,
    password: passwordValue,
  };
}

const userRegister = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  // console.log(objectToSend, "OBJECT");
  try {
    await axios.post("../createuser", objectToSend);
    window.location.href = "../login/login.html";
    alert("Te has resgitrado correctamente, debes iniciar sesion");
  } catch (error) {
    console.log(error);
  }
};

const buttonRegister = document.querySelector("#buttonRegister");
buttonRegister.addEventListener("click", (e) => {
  userRegister(e);
});
