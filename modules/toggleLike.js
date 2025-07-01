import { comments } from './comments.js'
import { renderComments } from './renderComments.js'

// export function toggleLike(event) {
//     const index = event.target.dataset.index // Получаем индекс комментария
//     const comment = comments[index]

//     // Переключаем состояние лайка
//     comment.isLiked = !comment.isLiked

//     // Изменяем количество лайков
//     comment.likes += comment.isLiked ? 1 : -1

//     // Перерисовываем комментарии
//     renderComments()
// }

// Функция задержки для имитации запроса
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

export function toggleLike(event) {
    event.stopPropagation() // Останавливаем всплытие

    const index = event.target.dataset.index
    const comment = comments[index]

    // Если уже идет загрузка, ничего не делаем
    if (comment.isLikeLoading) return

    // Устанавливаем состояние загрузки
    comment.isLikeLoading = true
    renderComments()

    // Имитируем задержку сети с помощью delay
    delay(2000).then(() => {
        // После задержки обновляем состояние
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1
        comment.isLiked = !comment.isLiked
        comment.isLikeLoading = false
        renderComments()
    })
}
