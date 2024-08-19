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

let isPlaying = false;
let currentSongId = null;

function highlightSong(matchingSong,button){
     if(matchingSong){

        if (isPlaying && currentSongId === matchingSong.id) {
           
            return;
        }

       
        if (isPlaying) {
          
            audio.pause();
            isPlaying = false;
            playBtn.style.display = 'inline';
            pauseBtn.style.display = 'none';
         
          
           
        }

        
        imgElement.src = matchingSong.imagesrc;
        audio.src = matchingSong.src;
        audio.play(); 
        isPlaying = true; 
        currentSongId = matchingSong.id; 


        songButtons.forEach((button) => {
            button.classList.remove("button-change");
    
        })
        button.classList.add("button-change");
        updatePlayPauseButtons()

    }
    
    



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
    playNextSong()
})



const previousButton = document.querySelector('.previous-button')
const playButton = document.querySelector('.play-button')
const nextButton = document.querySelector('.next-button')
const shuffleButton = document.querySelector('.shuffle-button')

function sortSongs(){
    return playlistData.slice().sort((a, b) => a.title.localeCompare(b.title)); // Corrected sorting to use titles

}


// let currentSongIndex = 0
// function playSong(){
//     const sortedSongs = sortSongs()

  

//     function playNextSong(){
//         if(currentSongIndex < sortedSongs.length){
//             const song = sortedSongs[currentSongIndex]
//             imgElement.src = song.imagesrc
//             audio.src = song.src
//             audio.play()

            

           

//             audio.removeEventListener('ended',onSongEnd)
//             audio.addEventListener('ended',onSongEnd)

            

//             updateProgressBar()
//         }
//     }
//     function onSongEnd(){
//         currentSongIndex++;
//          playNextSong()

//     }
//     playNextSong()
// }



const pauseBtn = playButton.querySelector('.fa-play')
const playBtn = playButton.querySelector('.fa-pause')

pauseBtn.addEventListener('click', () =>{
    if (!isPlaying) {     
        updatePlayPauseButtons()
        playCurrentSong()
        // audio.play();
        isPlaying = true;
       
       
    }
    // playBtn.style.display = 'inline'; 
    // pauseBtn.style.display = 'none';
    // playCurrentSong()

})
function updateTimeDisplay() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    timeDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}


playBtn.addEventListener ('click',() => {
    if(isPlaying){
        audio.pause();
        isPlaying = false;
        updatePlayPauseButtons()
    }
    // audio.pause()


    // playBtn.style.display = 'none'; 
    // pauseBtn.style.display = 'inline'; 

    // updateProgressBar()
    // updateTimeDisplay()


})

let currentSongIndex = 0

function playCurrentSong(){
    const sortedSongs = sortSongs();
    if(sortedSongs.length > 0  && currentSongIndex < sortedSongs.length) {
        const song = sortedSongs[currentSongIndex]
        imgElement.src = song.imagesrc;
        audio.src = song.src;
        audio.play(); 

        isPlaying = true;
        updatePlayPauseButtons()
        updateProgressBar();
        
        

        audio.removeEventListener('ended',onSongEnd)
        audio.addEventListener('ended',onSongEnd)

            

        updateProgressBar()


}
}
function playNextSong(){
    const sortedSongs = sortSongs();
    if(sortedSongs.length > 0){
        currentSongIndex = (currentSongIndex + 1) % sortedSongs.length
        playCurrentSong()

    }
}

function playPreviousSong(){
    const sortedSongs = sortSongs();
    if(sortedSongs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + sortedSongs.length) % sortedSongs.length;
        playCurrentSong()
    }
}
function onSongEnd(){
    playNextSong()
}
previousButton.addEventListener('click',playPreviousSong)
nextButton.addEventListener('click',playNextSong)

function updatePlayPauseButtons() {
    if (isPlaying) {
        playBtn.style.display = 'none'; // Hide play button
        pauseBtn.style.display = 'inline'; // Show pause button
    } else {
        pauseBtn.style.display = 'none'; // Hide pause button
        playBtn.style.display = 'inline'; // Show play button
        
    }
}

