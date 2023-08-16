// Datebase
const user_db = firebase.firestore();
// user input FOR LOGGING IN
const username_field = document.getElementById("user_username");
const password_field = document.getElementById("user_userpassword");

// USER INPUT FOR MAKING AN ACCOUNT
const createusername_field = document.getElementById("signupUsername");
const createpassword_field = document.getElementById("signupPassword");
const confirmcreatepassword_field = document.getElementById("confirmpassword");
console.log(confirmcreatepassword_field);
// Login Button
const login_BTN = document.getElementById("login_button");
// checks if the user is currently logged in
let userCurrentlyLoggedIn = false;
// Create Account Button
const create_BTN = document.getElementById("form_button");
let userRef = user_db.collection("users");
// logging in
login_BTN.onclick = (e) => {
  e.preventDefault();

  let arrayOfAllUsers = [];
  let arrayOfAllPasswords = [];
  // user input
  const username = username_field.value;
  const password = password_field.value;
  //  get all the documents
  userRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      arrayOfAllUsers.push(data.username);
      arrayOfAllPasswords.push(data.password);
    });

    for (let i = 0; i < arrayOfAllUsers.length; i++) {
      if (
        arrayOfAllUsers[i] == username &&
        arrayOfAllPasswords[i] == password
      ) {
        userCurrentlyLoggedIn = true;
        window.location.href = "../index.html";
        break;
      } else {
        // check if all users have been checked
        if (i == arrayOfAllUsers.length - 1) {
          alert("Please enter your correct credentials.");
        }
      }
    }
  });
};

// create account
create_BTN.onclick = (e) => {
  e.preventDefault();

  let username = createusername_field.value;
  let password = createpassword_field.value;
  let confirmpassword = confirmcreatepassword_field.value;

  if (password == confirmpassword) {
    userRef
      .add({
        username: username,
        password: password,
      })
      .then((userRef) => {
        console.log("you created the account!");
        createusername_field.value = "";
        createpassword_field.value = "";
        confirmcreatepassword_field.value = "";
      })
      .catch((err) => {
        alert("sorry something went wrong");
        location.reload();
      });
  } else {
    alert("Please enter your password correctly.");
  }
};

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Perform your AJAX/Fetch login

    setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 4
      ) {
        setInputError(
          inputElement,
          "Username must be at least 4 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});

