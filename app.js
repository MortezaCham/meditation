const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving circle');
    const video = document.querySelector('.vid-containor video');

    const sounds = document.querySelectorAll('.sound-picker button');
    const timeSelector = document.querySelectorAll('.time-select button');

    const timeDisplay = document.querySelector('.time-display');
    const outlineLength = outline.getTotalLength();

    let duration = 120;
      
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src= this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    play.addEventListener('click' , ()=>{
        checkPlaying(song);
    });

    timeSelector.forEach(option =>{
        option.addEventListener('click' , function(){
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)} : ${Math.floor(duration % 60)}`;
        });
    });
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = 'svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = 'svg/play.svg'
        }
    };

    song.ontimeupdate = ()=>{
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progres = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progres;

        timeDisplay.textContent= `${minutes}:${seconds}`;

        if( currentTime >= duration){
            song.pause();
            song.currentTime = 0;
            video.pause();
            play.src = 'svg/play.svg';
        }
    };
};

app();