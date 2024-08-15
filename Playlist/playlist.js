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


songButtons.forEach((button) => {
    button.addEventListener('click',() =>{
        const songId = button.dataset.songId

        const imgElement = document.querySelector('.background-image')
        // const currentSrc = imgElement.getAttribute('src')

        songButtons.forEach((button) => {
            button.classList.remove("button-change");
        })

        let matchingSong =""

        playlistData.forEach((song) => {
            if (song.id === songId){
                matchingSong = song
                imgElement.src = matchingSong.imagesrc;
                button.classList.add("button-change");
                // button.style.backgroundColor = "#d55d92";
                // button.style.Color = "#47126b";
    
            }
        })
        
        
        
    })
})

