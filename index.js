import { renderComments } from "./modules/renderComments.js";
import { addComment } from "./modules/addComment.js";
import { sanitizeInput } from "./modules/sanitizeInput.js";
import { updateTasks } from "./modules/comments.js";

fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments").then(
  (response) => {
    return response.json();
  }).then((data)=>{
    console.log(data);
    updateTasks(data.comments)
    renderComments()
  })

//   fetch("https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments",{
//     method:'POST',
//     body: JSON.stringify(newComment),
//   }).then(response => {
//     return response.json();
// }).then(data =>{
//     console.log(data);
//     updateTasks(data.comments);
//     renderComments();
// })
