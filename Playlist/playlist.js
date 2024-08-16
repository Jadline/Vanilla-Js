import {playlistData} from "./playlistdata.js"

let songsHTML = ""
playlistData.forEach((song) => {
    const artistparts = song.artist.split(" ")
    let formattedArtist = artistparts.length === 3 ? `${artistparts[0]}  ${artistparts[1]} <br>${artistparts[2]} ` : song.artist

    songsHTML += `
        <div class="song-content">
                <button class="song-data" data-song-id="${song.id}"><span class="song-title">${song.title}</span> <span class="song-artist">${formattedArtist}</span> <span class="song-duration">${song.duration}</span></button>
        </div>
    `
    
})
document.querySelector('.song-container').innerHTML = songsHTML;

const songButtons = document.querySelectorAll('.song-data')
const timeDisplay = document.querySelector('.time')
const progressBar = document.querySelector('.progress-bar');
const imgElement = document.querySelector('.background-image')
const audio = new Audio()


function getMatchingSong(songId){
    let matchingSong = ""
    playlistData.forEach((song) => {
        if(song.id === songId){
            matchingSong = song
        
     }
   })
   return matchingSong
}

function highlightSong(matchingSong,button){
     if(matchingSong){
        imgElement.src = matchingSong.imagesrc;
        audio.src = matchingSong.src
        audio.play()

    }
    songButtons.forEach((button) => {
        button.classList.remove("button-change");

    })
    button.classList.add("button-change");
    



}

function initializeButtons (){
    songButtons.forEach((button) => {
        button.addEventListener('click', () =>{
            const songId = button.dataset.songId
            const matchingSong = getMatchingSong(songId)
            highlightSong(matchingSong,button)
          

        })
    })
   
}
initializeButtons()

function updateProgressBar(){
   
    if(audio.duration){
        const currentTime = audio.currentTime
        const duration = audio.duration
        const percentage = (currentTime / duration) * 100

        progressBar.style.setProperty('--progress-width',`${percentage}%`) 

        const remainingTime = duration - currentTime 
        const minutes = Math.floor(remainingTime/60);
        const seconds = Math.floor(remainingTime % 60)
        const formattedseconds = seconds < 10 ? `0${seconds}` : `${seconds}`


        const formattedTime = `${minutes}:${formattedseconds}`
        timeDisplay.innerHTML = formattedTime
    }
}
audio.addEventListener('timeupdate',updateProgressBar)
audio.addEventListener('ended',() => {
    progressBar.style.setProperty('--progress-width','0%') 
    timeDisplay.innerHTML = '0:00'
})

// function highlightSong() {
//     songButtons.forEach((button) => {
//         button.addEventListener('click',() =>{
//             const songId = button.dataset.songId

//             const imgElement = document.querySelector('.background-image')
//             // const currentSrc = imgElement.getAttribute('src')

//             songButtons.forEach((button) => {
//                 button.classList.remove("button-change");
//             })

//             let matchingSong =""

//             playlistData.forEach((song) => {
//                 if (song.id === songId){
//                     matchingSong = song
//                     imgElement.src = matchingSong.imagesrc;
//                     time.innerHTML = matchingSong.duration;
                    
//                     button.classList.add("button-change");
//                     // console.log(matchingSong.src)
//                     audio.src = matchingSong.src
//                     audio.addEventListener('timeupdate',updateProgressBar)
//                     audio.play()
//                     audio.addEventListener('ended',() => {
//                         progressBar.style.width = "0%";
//                     })
//                     // button.style.backgroundColor = "#d55d92";
//                     // button.style.Color = "#47126b";
        
//                 }
//             })

//             function updateProgressBar() {
//                 audio.duration = matchingSong.duration

//                 if(audio.duration){
//                     const percentage = (audio.currentTime/audio.duration) * 100
//                     progressBar.style.width = `${percentage}`
//                 }

//             }
           

            

            
            
            
            
            
//         })
//     })
// }
// highlightSong()

// const previousButton = document.querySelector('.previous-button')
// const playButton = document.querySelector('.play-button')
// const nextButton = document.querySelector('.next-button')
// const shuffleButton = document.querySelector('.shuffle-button')


    


