//Variables for nav display
const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
const nav = document.querySelector("nav");

//Adding event listener for the toggling nav
hamburger.addEventListener("click", () => nav.classList.add("nav-active"));
closeMenu.addEventListener("click", () => nav.classList.remove("nav-active"));

//toggle between buy or sell crypto
const payorReceive = document.querySelector(".receive_pay");
const sellCrypto = document.querySelector(".sell-crypto");
const buyCrypto = document.querySelector(".buy-crypto");
const select = document.querySelectorAll(".select");
select.forEach((btn) =>
  btn.addEventListener("click", () => {
    const selectActive = document.querySelectorAll(".select-active");
    selectActive[0].classList = selectActive[0].className.replace(
      "select-active",
      ""
    );
    btn.className += " select-active";

    if (btn.classList.contains("sell-crypto")) {
      payorReceive.innerText = "You receive";
    } else if (btn.classList.contains("buy-crypto")) {
      payorReceive.innerText = "You pay";
    }
  })
);

//first step variables and functionalities
const firstStepBtn = document.querySelector(".first-step-btn");
const amountInput = document.querySelector("#amount-input");
const amountInnerText = document.querySelector(".amount");

//first step client-side Validation
firstStepBtn.addEventListener("click", () => {
  if (amountInput.value == "") {
    errorDisplay(amountInput, `Amount can't be blank`);
  } else if (amountInput.value < 2000) {
    errorDisplay(amountInput, `Amount must not be less than 2000`);
  } else {
    successDisplay(amountInput);
    activeRemoval();
    secondStep.className += " sec-active";
  }
});
//solve for the value of the amount to be received when selling crypto and amount to pay when buying crypto
const solveForAmountToReceive = () => {
  if (payorReceive.innerText == "You receive") {
    let amount = 0;
    amount =
      parseFloat(amountInput.value) - (parseFloat(amountInput.value) * 2) / 100;
    if (amountInput.value == "") {
      amountInnerText.innerText = `NGN 0.00`;
    } else {
      amountInnerText.innerText = `NGN ${amount}`;
    }
  } else if (payorReceive.innerText == "You pay") {
    let amount = 0;
    amount =
      parseFloat(amountInput.value) + (parseFloat(amountInput.value) * 2) / 100;
    if (amountInput.value == "") {
      amountInnerText.innerText = `NGN 0.00`;
    } else {
      amountInnerText.innerText = `NGN ${amount}`;
    }
  }
  setTimeout(solveForAmountToReceive, 10);
};
solveForAmountToReceive();

//second step variables and functionalities
const secondStepBtn = document.querySelector(".second-step-btn");
const paymentInput = document.querySelectorAll(".payment-input");
const accountNumber = document.querySelector(".account-number");
const accountName = document.querySelector(".account-name");
const expMonth = document.querySelector(".exp-month");
const expYear = document.querySelector(".exp-year");
const firstStep = document.querySelector(".first-step");
const secondStep = document.querySelector(".second-step");
const successful = document.querySelector(".successful");
const paymentBackArrow = document.querySelector(".back-payment");
const transactionBackArrow = document.querySelector(".back-transaction");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  paymentInput.forEach((input) => {
    if (input.value === "") {
      if (input.classList.contains("account-number")) {
        errorDisplay(input, `Account number can't be blank`);
      } else if (input.classList.contains("account-name")) {
        errorDisplay(input, `Account name can't be blank`);
      } else if (
        input.classList.contains("exp-month") ||
        input.classList.contains("exp-year")
      ) {
        errorDisplay(input, `Exp month or year can't be blank`);
      }
    } else if (input.classList.contains("account-number")) {
      if (input.value.length < 10 || input.value.length > 10) {
        errorDisplay(input, `Account number must be 10 characters`);
      } else {
        successDisplay(input);
      }
    } else if (input.classList.contains("exp-month")) {
      if (input.value.length < 2) {
        errorDisplay(input, `Exp month/year must be have 2 characters each`);
      } else if (input.value.length == 2) {
        console.log("okay");
      } else {
        successDisplay(input);
      }
    } else if (input.classList.contains("exp-year")) {
      if (input.value.length < 2) {
        errorDisplay(input, `Exp month/yeaSr must be have 2 characters each`);
      } else if (input.value.length == 2) {
        return;
      } else {
        successDisplay(input);
      }
    } else {
      successDisplay(input);
      activeRemoval();
      successful.className += " sec-active";
    }
  });
});

//adding eventlistener and functionalities to the back arrow
paymentBackArrow.addEventListener("click", () => {
  activeRemoval();
  firstStep.className += " sec-active";
});

transactionBackArrow.addEventListener("click", () => {
  activeRemoval();
  secondStep.className += " sec-active";
});

//active class removal
function activeRemoval() {
  const secActive = document.querySelector(".sec-active");
  secActive.classList = secActive.className.replace("sec-active", "");
}

//error display when either of the input is empty
function errorDisplay(input, message) {
  input.parentElement.classList.add("error");
  input.nextElementSibling.innerText = message;
}

//success display when the input is filled correctly
function successDisplay(input) {
  input.parentElement.classList.remove("error");
  input.parentElement.classList.add("success");
}
