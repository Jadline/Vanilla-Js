let currentNumber = document.querySelector('.current-number')
let currentValue = Number(currentNumber.innerHTML)
console.log(currentValue )
const increaseButton = document.querySelector('.increase-button')
const decreaseButton = document.querySelector('.decrease-button')
const resetButton = document.querySelector('.reset-button')

increaseButton.addEventListener('click',() => {
    currentValue = increase()
    currentNumber.innerHTML = currentValue 
})
decreaseButton.addEventListener('click', () => {
    currentValue = decrease()
    currentNumber.innerHTML = currentValue
})
resetButton.addEventListener('click', () => {
    let currentValue = reset()
    currentNumber.innerHTML = currentValue
})





function increase(){
    return currentValue += 1




}
function decrease (){
    return currentValue -= 1

}
function reset() {
    return currentValue = 0

}