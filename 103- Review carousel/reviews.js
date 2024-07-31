import {data} from '/data.js'

let currentIndex = 0

function displayReview(index){
    const item = data[index]
    const reviewsHTML = 
    `<div class="content-one">
                <img src="${item.image}" class="img">
                <p class="name">${item.name}</p>
                <p class="career">${item.occupation}</p>
            </div>
            <div class="content-two">
                <p>${item.review}</p>    
            </div>`
    document.querySelector('.js-info-card').innerHTML = reviewsHTML
    
}
displayReview(currentIndex)
const rightButton = document.querySelector('.right-button')
const leftButton = document.querySelector('.left-button')
    
    

rightButton.addEventListener('click',() => {
    currentIndex = (currentIndex + 1) % data.length
    displayReview(currentIndex)
})
leftButton.addEventListener('click', () => {
    currentIndex = ((currentIndex - 1) + data.length)  % data.length
    displayReview(currentIndex)
} )

const randomReviewButton = document.querySelector('.js-random-review')

randomReviewButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * data.length)
    currentIndex = randomIndex
    displayReview(currentIndex)
})