import { albumData } from "./albumdata.js"

document.addEventListener ('DOMContentLoaded', () => {
    const texts = {
        h2 : "Welcome to Jaddie's Collage",
        p1 : "This Digital album is inspired by my love for photography and nature.",
        p2 : "Life is a series of a thousand miracles,notice them"
    }

    function typeText(element,text,speed,callback) {
        element.style.visibility = "visible"
        let index = 0
        element.textContent= ""

        const Interval = setInterval(() => {
            if(index < text.length) {
                element.textContent += text.charAt(index)
                index ++;
            }
            else {
                clearInterval(Interval)
                console.log('Finished typing:', element);
                if (callback) {
                    callback()
                }
            }
        },speed)



    }

    const h2Element = document.querySelector('.h2-intro')
    const p1Element = document.querySelector('.p1-intro')
    const p2Element = document.querySelector('.p2-intro')

    typeText(h2Element,texts.h2,70, () => {
        typeText(p1Element,texts.p1,70, () => {
            typeText(p2Element,texts.p2,70)
        })
    })

})
const fav = [
    {
        src : "Image-collections/mysticalwaters.jpg"
    },
    {
        
        src : "Image-collections/sunrise2.jpg"
    },
    {
        
        src : "Image-collections/researchtree.jpg"
    }
    

]



const nextButton = document.querySelector('.next-button')

let currentIndex = 0

nextButton.addEventListener('click' ,() => {
    const favPhotos = document.querySelector('.fav-photos')
    

    if(currentIndex < fav.length){
        let image = document.createElement('img')
        image.src = fav[currentIndex].src
        image.classList.add('img')
        favPhotos.appendChild(image)
        currentIndex++;


    }
   
    


    

})
const rightButton = document.querySelector('.right-button')
const leftButton = document.querySelector('.left-button')

let currentPhotoIndex = 0


function displayPhoto(currentPhotoIndex){
    const currentPhoto = albumData[currentPhotoIndex]

    let photoHTML = ""

    photoHTML += `<img  class="placeholder-image"  src="${currentPhoto.src}"/>`

    document.querySelector('.image-holder').innerHTML = photoHTML
}

rightButton.addEventListener('click',() => {
    currentPhotoIndex = (currentPhotoIndex + 1) % albumData.length
    displayPhoto(currentPhotoIndex)
})
leftButton.addEventListener('click',() => {
    currentPhotoIndex = ((currentPhotoIndex - 1) + albumData.length) %  albumData.length
    displayPhoto(currentPhotoIndex)
})

