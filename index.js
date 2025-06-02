import {renderComments} from "./modules/renderComments.js";
import {addComment} from "./modules/addComment.js"
import {sanitizeInput} from "./modules/sanitizeInput.js"

const addButton = document.querySelector(".add-form-button");


addButton.addEventListener("click", addComment);
renderComments();
