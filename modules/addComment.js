import { renderComments } from './renderComments.js'
import { sanitizeInput } from './sanitizeInput.js'
import { fetchComments } from './fetchComments.js'
import { comments, updateTasks } from './comments.js'

const nameInput = document.querySelector('.add-form-name')
const commentInput = document.querySelector('.add-form-text')

export function addComment() {
    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
        let name = sanitizeInput(nameInput.value.trim())
        let comment = sanitizeInput(commentInput.value.trim())

        // Проверка на пустые поля
        if (!name || !comment) {
            alert('Пожалуйста, заполните все поля.')
            nameInput.value = ''
            commentInput.value = ''
            return
        }

        const newComment = {
            name: name,
            text: comment,
        }

        // Сохраняем текущие комментарии
        const originalComments = [...comments]

        // Создаем минималистичное сообщение о загрузке
        const loadingMessage = {
            author: { name: '' }, // Пустое имя
            text: 'Пожалуйста подождите, идет загрузка...',
            date: '',
            likes: 0,
            isLiked: false,
            isPlainText: true, // Флаг для простого текста
        }

        // Заменяем на сообщение о загрузке
        updateTasks([loadingMessage])
        renderComments()

        // Очистка полей ввода
        nameInput.value = ''
        commentInput.value = ''

        addButton.textContent = 'Загрузка...'
        addButton.disabled = true

        fetch('https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                return fetchComments()
            })
            .catch((error) => {
                // В случае ошибки возвращаем оригинальные комментарии
                updateTasks(originalComments)
                throw error
            })
            .finally(() => {
                addButton.textContent = 'Написать'
                addButton.disabled = false
                renderComments()
            })
    })
}
