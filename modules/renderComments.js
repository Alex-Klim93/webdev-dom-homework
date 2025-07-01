import { comments } from './comments.js'
import { toggleLike } from './toggleLike.js'

const commentsList = document.querySelector('.comments')
//const nameInput = document.querySelector('.add-form-name')
const commentInput = document.querySelector('.add-form-text')

export function renderComments() {
    commentsList.innerHTML = '' // Очищаем список перед отрисовкой

    comments.forEach((comment, index) => {
        // Проверяем, это простое текстовое сообщение или обычный комментарий
        const commentBlock = comment.isPlainText
            ? `<li class="comment" style="color: white; background: none; border: none; padding: 0; list-style: none; margin: 0;">
                  <div class="comment-text" style="color: white; padding: 10px;">
                      ${comment.text}
                  </div>
              </li>`
            : `<li class="comment" data-indexLi="${index}">
                  <div class="comment-header" data-indexLi="${index}">
                      <div>${comment.author.name}</div>
                      <div>${comment.date}</div>
                  </div>
                  <div class="comment-body" data-indexLi="${index}">
                      <div class="comment-text" data-indexLi="${index}">
                          ${comment.text}
                      </div>
                  </div>
                  <div class="comment-footer" data-indexLi="${index}">
                      <div class="likes" data-indexLi="${index}">
                          <span class="likes-counter">${comment.likes}</span>
                          <button class="like-button 
                                ${comment.isLiked ? '-active-like' : ''} 
                                ${comment.isLikeLoading ? '-loading-like' : ''}" 
                                data-index="${index}">
                            </button>
                      </div>
                  </div>
              </li>`

        commentsList.innerHTML += commentBlock
    })

    const commentsElements = commentsList.querySelectorAll('.comment')
    commentsElements.forEach((commentElement) => {
        commentElement.addEventListener('click', (event) => {
            const indexLi = commentElement.getAttribute('data-indexLi')
            const comment = comments[indexLi]
            //nameInput.value = comment.author.name;  // Заполняем поле имени автора
            commentInput.value =
                '>>> ' + comment.author.name + '\n' + comment.text // Заполняем поле текста комментария
        })
    })

    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // event.stopPropagation() // Останавливаем всплытие события
            const indexLi = event.target.dataset.index // Получаем индекс комментария
            toggleLike(event)
        })
    })
}

renderComments()
