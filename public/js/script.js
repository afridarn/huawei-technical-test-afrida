const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const getDataButton = document.getElementById("get-data-button");
const registerForm = document.getElementById("register-form");
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;

// Animate labels on focus
inputs.forEach((input, index) => {
  input.addEventListener("focus", function () {
    labels[index].classList.add("active");
  });

  input.addEventListener("blur", function () {
    if (!this.value.trim()) {
      labels[index].classList.remove("active");
    }
  });
});

// Validate form inputs
function validateInputs() {
  let isValid = true;

  inputs.forEach((input, index) => {
    const errorElement = document.getElementById(`error-${input.id}`);
    if (!input.value.trim()) {
      input.style.border = "2px solid red";
      errorElement.textContent = "This field is required";
      isValid = false;
    } else {
      input.style.border = "";
      errorElement.textContent = "";
    }
  });

  return isValid;
}

// Submit form
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateInputs()) {
    const formData = {};

    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });

    fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Data submitted successfully.",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Form submission failed.",
          });
        }
        inputs.forEach((input) => {
          input.value = "";
        });
      })
      .catch((error) => {
        console.error("There was a problem:", error);
      });
  }
});

// Get data from server
getDataButton.addEventListener("click", function () {
  const registeredDataWrapper = document.getElementById("registered-data-wrapper");
  const registeredData = document.getElementById("registered-data");
  const body = document.body;

  registeredDataWrapper.classList.remove("hidden");
  body.classList.add("active");

  fetch("/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        registeredData.innerHTML = "<p>No data available</p>";
        return;
      }
      const dataContainer = document.createElement("div");

      data.forEach((entry, index) => {
        const entryElement = document.createElement("div");
        entryElement.innerHTML = `
  <p>Data ${index + 1}<br />Name: ${entry.name}<br/>Email: ${entry.email}<br/>Phone Number: ${entry.phone}</p>
`;
        dataContainer.appendChild(entryElement);
      });

      registeredData.innerHTML = "";
      registeredData.appendChild(dataContainer);
    })
    .catch((error) => {
      console.error("There was a problem:", error);
    });
});
