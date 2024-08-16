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
        const formattedminutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const formattedseconds = seconds < 10 ? `0${seconds}` : `${seconds}`


        const formattedTime = `${formattedminutes}:${formattedseconds}`
        timeDisplay.innerHTML = formattedTime
    }
}
audio.addEventListener('timeupdate',updateProgressBar)
audio.addEventListener('ended',() => {
    progressBar.style.setProperty('--progress-width','0%') 
    timeDisplay.innerHTML = '0:00'
})



const previousButton = document.querySelector('.previous-button')
const playButton = document.querySelector('.play-button')
const nextButton = document.querySelector('.next-button')
const shuffleButton = document.querySelector('.shuffle-button')

function sortSongs(){
    playlistData.sort((a,b) =>{
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    })
    return playlistData

}


function playSong(){
    const sortedSongs = sortSongs()

    let currentSongIndex = 0
  

    function playNextSong(){
        if(currentSongIndex < sortedSongs.length){
            const song = sortedSongs[currentSongIndex]
            imgElement.src = song.imagesrc
            audio.src = song.src
            audio.play()

            audio.removeEventListener('ended',onSongEnd)
            audio.addEventListener('ended',onSongEnd)

            

            updateProgressBar()
        }
    }
    function onSongEnd(){
        currentSongIndex++;
         playNextSong()

    }
    playNextSong()
}



const pauseBtn = playButton.querySelector('.fa-play')
const playBtn = playButton.querySelector('.fa-pause')

pauseBtn.addEventListener('click', () =>{
    pauseBtn.style.display = "none"
    playBtn.style.display = 'inline'
    playSong()

})
function updateTimeDisplay() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    timeDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}
