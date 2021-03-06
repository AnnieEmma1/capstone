const mobileMenu = document.querySelector("#mobile-menu");
const icon = document.querySelector("#mobile-menu i");
const navItems = document.querySelector("nav ul");
const form = document.forms[0];
const alertBox = document.querySelector("div.alert");
const inputs = document.querySelectorAll("form input.form-control");
const passwordIcon = document.querySelector(".pass i");

passwordIcon.addEventListener("click", (e) => {
  const el = e.currentTarget;
  const pass = document.querySelector("input[name='pass']");
  if (el.classList.contains("bi-eye-slash")) {
    pass.type = "text";
    el.classList.remove("bi-eye-slash");
    el.classList.add("bi-eye");
  } else {
    pass.type = "password";
    el.classList.add("bi-eye-slash");
    el.classList.remove("bi-eye");
  }
});
mobileMenu.addEventListener("click", () => {
  navItems.classList.toggle("active");
  if (icon.classList.contains("bi-list")) {
    icon.classList.remove("bi-list");
    icon.classList.add("bi-x-circle");
  } else {
    icon.classList.add("bi-list");
    icon.classList.remove("bi-x-circle");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  inputs.forEach((inp) => {
    validateInput(inp);
  });

  const errors = [];
  inputs.forEach((inp, i) => {
    const err = inp.nextElementSibling.innerHTML.length > 0;
    errors[i] = err;
  });

  alertBox.classList.remove("d-none");
  const hasErrors = errors.some((i) => i);
  if (hasErrors) {
    alertBox.classList.remove("alert-success");
    alertBox.classList.add("alert-danger");
    alertBox.innerText = "Please fix all the errors";
  } else {
    alertBox.classList.remove("alert-danger");
    alertBox.classList.add("alert-success");
    alertBox.innerText =
      "Congratulations, your account has been added successfully";
  }
});

const validateInput = (ele) => {
  alertBox.classList.add("d-none");
  const val = ele.value;
  const msg = ele.dataset.msg;
  if (ele.name === "cpass") {
    const pass = document.querySelector("input[name='pass']");
    if (pass.value !== val) {
      handleErrors(ele, msg);
    } else {
      handleErrors(ele, "");
    }
  } else {
    const pattern = ele.dataset.pattern;
    const p = new RegExp(pattern);

    if (!p.test(val)) {
      handleErrors(ele, msg);
    } else {
      handleErrors(ele, "");
    }
  }
};

const handleErrors = (ele, msg) => {
  const msgBox = ele.nextElementSibling;
  if (msg.length > 0) {
    ele.classList.add("is-invalid");
  } else {
    ele.classList.remove("is-invalid");
  }
  if (msgBox.length > 0) {
    msgBox.classList.add("invalid-feedback");
  } else {
    msgBox.classList.remove("invalid-feedback");
  }
  msgBox.innerText = msg;
};