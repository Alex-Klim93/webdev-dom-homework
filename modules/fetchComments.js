import { updateTasks } from './comments.js'

export function fetchComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/Alex-Klim93/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при получении комментариев')
            }
            return response.json()
        })
        .then((data) => {
            if (!data || !data.comments) {
                throw new Error('Некорректный формат данных комментариев')
            }
            updateTasks(data.comments)
            return data.comments
        })
}
