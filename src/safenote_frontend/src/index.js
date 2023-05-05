import { safenote_backend_1 } from "../../declarations/safenote_backend_1";
import { safenote_backend_2 } from "../../declarations/safenote_backend_2";
import { safenote_backend_3 } from "../../declarations/safenote_backend_3";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  button.setAttribute("disabled", true);


  try {
    const testId = "id4a";
    const response = await safenote_backend_1.readKey(testId);
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }

  button.removeAttribute("disabled");

  

  return false;
});
