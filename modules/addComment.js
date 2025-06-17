import { renderComments } from './renderComments.js'
//import { comments } from './comments.js'
import { sanitizeInput } from './sanitizeInput.js'
import { updateTasks } from './comments.js'

const nameInput = document.querySelector('.add-form-name')
const commentInput = document.querySelector('.add-form-text')
export function addComment() {
    const addButton = document.querySelector('.add-form-button')
    addButton.addEventListener('click', () => {
        let name = sanitizeInput(nameInput.value.trim())
        let comment = sanitizeInput(commentInput.value.trim())
        const date = new Date().toLocaleString()

        // Проверка на пустые поля
        if (!name || !comment) {
            alert('Пожалуйста, заполните все поля.')
            nameInput.value = ''
            commentInput.value = ''
            return
        }
        console.log(name)
        // const newComment = {
        //   author: {name: name},
        //   date: new Date(),
        //   text: comment,
        //   likes: 0,
        //   liked: false,
        // };

        const newComment = {
            name: name,
            text: comment,
        }

        renderComments()

        // Очистка полей ввода
        nameInput.value = ''
        commentInput.value = ''
        console.log('Имя:', name)
        console.log('Комментарий:', comment)
        console.log('Комментарий:', newComment)

        //comments.push(newComment)
        fetch('https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        }).then((response) => {
            fetch('https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments')
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data)
                    updateTasks(data.comments)
                    renderComments()
                    addComment()
                })
        })
    })
}
