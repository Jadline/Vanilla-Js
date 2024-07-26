const colors = ['Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Purple',
    'Pink',
    'Brown',
    'Black',
    'White',
    'Gray',
    'Cyan',
    'Magenta',
    'Maroon',
    'Olive',
    'Navy',
    'Teal',
    'Lime',
    'Coral']

const flipButton = document.querySelector('.js-flip-button')
console.log(flipButton)
const colorContainer = document.querySelector('.js-color-container')
console.log(colorContainer)
let colorText = document.querySelector('.color-text')
console.log(colorText)

flipButton.addEventListener('click',() => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    let  selectedColor = colors[randomIndex]
    if (selectedColor.charAt(0) === '|') {
        selectedColor = selectedColor.substring(1);
    }
    if (selectedColor.toLowerCase() === 'black'){
        colorText.style.color = 'white'
        flipButton.style.borderColor ='white'
    }
    else {
        colorContainer.style.backgroundColor = selectedColor
        colorText.innerHTML = selectedColor
        flipButton.style.borderColor ='black'
        colorText.style.color = 'black'

    }
    

})