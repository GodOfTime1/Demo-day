// <<<<<<< HEAD
const user_db = firebase.firestore();
const username_field = document.getElementById("user_username");
const password_field = document.getElementById("user_userpassword");
// Login Button
const submit_BTN = document.getElementById("login_button");
// Create Account Button
const create_BTN = document.getElementById("form_button");
let userRef = user_db.collection("users");
userRef.doc("user1").set({
  username: "abc123",
  password: "abc123",
});
// login page
submit_BTN.onclick = (e) => {
  e.preventDefault();
  console.log(user_db.collection("users").doc("user1"));
  userRef
    .doc("user1")
    .get()
    .then((doc) => {
      console.log(doc.data());
    });
};
// create account pa)ge
create_BTN.onclick = (e) => {
  e.preventDefault();
  console.log("this is working");
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
