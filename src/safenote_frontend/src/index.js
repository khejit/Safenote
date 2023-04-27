import { safenote_backend } from "../../declarations/safenote_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const response = await safenote_backend.readKey('id4a');

  button.removeAttribute("disabled");

  console.log(response);

  return false;
});
