import {playlistData} from "./playlistdata.js"

let songsHTML = ""
playlistData.forEach((song) => {
    const artistparts = song.artist.split(" ")
    let formattedArtist = artistparts.length === 3 ? `${artistparts[0]}  ${artistparts[1]} <br>${artistparts[2]} ` : song.artist

    songsHTML += `
        <div class="song-content">
                <button class="song-data"><span class="song-title">${song.title}</span> <span class="song-artist">${formattedArtist}</span> <span class="song-duration">${song.duration}</span></button>
        </div>
    `
    
})
document.querySelector('.song-container').innerHTML = songsHTML;

const song = document.querySelector('.song-data')
song.addEventListener('click',() => {
    console.log(song)
})