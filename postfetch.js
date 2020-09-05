document.getElementById("form1").addEventListener("submit", submitSignupForm);

function submitSignupForm(e) {
  e.preventDefault();
  var title = myInput("title");
  var author = myInput("wname");
  var content = myInput("subject");
  fetch(`http://127.0.0.1:3000/v1/blogs`, {
    // Adding method type
    method: "POST", // Adding body or contents to send
    mode: "cors",
    body: JSON.stringify({
      title,
      author,
      content,
    }), // Adding headers to the request
    headers: {
      "Content-Type": "application/json",
    },
  }) // Converting to JSON
    .then((response) => response.json()) // Displaying results to console
    .then((json) => console.log(json))
    .catch((err) => console.log("Login Error happen", err));
}

function myInput(id) {
  return document.getElementById(id).value;
}