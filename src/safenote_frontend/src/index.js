import { safenote_backend } from "../../declarations/safenote_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  button.setAttribute("disabled", true);


  try {
    const testId = "id4a";
    const response = await safenote_backend.readKey('thisIdDoesNotExist');
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }

  button.removeAttribute("disabled");

  

  return false;
});
