//variables
// let darkMode = document.querySelector('.dark-mode')
let darkModeIcon = document.querySelector('.fa-moon')
let darkModeSection = document.querySelector('.music-page >.container')
let settingSection = document.querySelector('.music-page .container .content > div')
//music
let soundContent = document.querySelector('.content .music-content')
let chooseLoop = document.querySelectorAll('.choose-tools li')
let hideSoundList = document.querySelector('.sound-container')
let soundContainerUl = document.querySelector('.sound-container')
let runningContent = document.querySelector('.content .running-content')
let getSoundView = document.querySelector('.sound-view')
let nameView = document.querySelector('.name-view')
let soundLength = document.querySelector('.sound-length')
let changePlayIcon = document.querySelector('.fa-play-circle')
let changePauseIcon = document.querySelector('.fa-pause-circle')
let playPrevSound = document.querySelector('.fa-arrow-alt-circle-left')
let playNextSound = document.querySelector('.fa-arrow-alt-circle-right')
let getCurrentTime = document.querySelector('.timing-list .current-time')
let getDuration = document.querySelector('.timing-list .duration')
// let getRepetIcon = document.querySelector('.fa-redo-alt')
let playClickedSong,stopSong,clearClickedColor,pauseSongRep;//play clicked one
let cur_index =0; 
let asbtractSoundData;
let getAllMusic;
//films
let abstractVideoData,video_index = 0;
let filmContainer = document.querySelector('.film-container')
let filmView = document.querySelector('.film-view')
let filmScreen = document.querySelector('.film-screen')
let filmLength = document.querySelector('.film-length')
let filmName = document.querySelector('.film-view h3')
let filmControls = document.querySelector('.film-controls')
let play = document.querySelector('.film-view .fa-play-circle')
let pause = document.querySelector('.film-view .fa-pause-circle')
let nextIcon = document.querySelector('.film-view .fa-arrow-alt-circle-right')
let prevIcon = document.querySelector('.film-view .fa-arrow-alt-circle-left')
let catchFilmCurrent = document.querySelector('.film-current')
let filmTimeline = document.querySelector('.film-timeline')
let filmTimelineBar = document.querySelector('.film-timeline .film-timeline-bar')
let catchFilmDuration = document.querySelector('.film-duration')
let filmItems

//mobile
let mobileNavIcon = document.querySelector('.mob-nav .fa-bars')
let mobileLinks = document.querySelector('.mob-nav .mob-links')
let mobileLinksLi = document.querySelector('.mob-nav .mob-links li')
let mobileClosePopup = document.querySelector('.popup .close-btn')

///////funcs////////
//stop clicked song when filp
function stopClickedSong(){
    if(stopSong){
        stopSong.pause()
        clearClickedColor = 'unset'
    }
}
//show pause icon only
function showPause(){
    changePauseIcon.style.display = 'block'
    changePlayIcon.style.opacity = 0
}
//show play icon only
function showPlay(){
    changePauseIcon.style.display = 'none'
    changePlayIcon.style.opacity = 1
}
//play music
function playMusic(){
    showPause()
    getAllMusic[cur_index].play()
    nameView.textContent = getAllMusic[cur_index].previousSibling.textContent
    //add remove color of curret element
    getAllMusic[cur_index].parentElement.style.color = 'lawngreen'
    cur_index > 0 ? getAllMusic[cur_index].parentElement.previousSibling.style.color = 'unset':console.log('no color')
}
//pause
function pauseMusic(){
    showPlay()
    getAllMusic[cur_index].pause()
    stopClickedSong()
}
//next
function nextMusic(){
    cur_index ++;
    let lastEleIndex = getAllMusic.length-1
    if(cur_index > getAllMusic.length || cur_index == getAllMusic.length){
        cur_index = 0
        getAllMusic[cur_index].play()
        nameView.textContent = getAllMusic[cur_index].previousSibling.textContent
        getAllMusic[lastEleIndex].pause()//pause last one
        // getAllMusic[lastEleIndex].parentElement.style.color = 'unset'
    }else{
        playMusic()
        getAllMusic[cur_index-1].pause()
    }
}
//prev
function prevMusic(){
    cur_index --;
    if(cur_index < 0){
        cur_index = getAllMusic.length-1
        getAllMusic[cur_index].play()
        getAllMusic[0].pause()//pause 0 one
        nameView.textContent = getAllMusic[cur_index].previousSibling.textContent
        getAllMusic[0].parentElement.style.color = 'unset'
        
    }else{
        playMusic()
        getAllMusic[cur_index+1].pause()//pause prev one
    }
    if(stopSong){
        stopClickedSong()
        getAllMusic[cur_index].play()

    }
    //add remove color of current element
    getAllMusic[cur_index].parentElement.style.color = 'lawngreen'
    getAllMusic[cur_index].parentElement.nextElementSibling.style.color = 'unset'

}
//add active on choose tools (sound or video list)
function showHide(show){
    show.forEach((ele,index)=>{
        ele.addEventListener('click',()=>{//add class active
            show.forEach(ele=>{//remove class active
                ele.classList.remove('active')
                if(index == 0){
                    hideSoundList.style.display = 'none'
                    getSoundView.style.display = 'none'
                    pauseMusic()//pause music
                }else{
                    filmContainer.style.display = 'none'//film
                    filmView.style.display = 'none'//film
                    hideSoundList.style.display = 'grid'
                    getSoundView.style.display = 'block'
                    pauseFilm()//pause film
                    playMusic()
                }
            })
            ele.classList.add('active')
        })
    })
}
showHide(chooseLoop)
//func to change border ofsound name
function changeSoundBack(){
    let colorArrays = ['black','brown','crimson','darkgrey','blue','pink']
    setInterval(()=>{
        let colorBank = colorArrays[Math.floor(Math.random()*colorArrays.length)]
        nameView.style.background = colorBank 
    },1000)
}

//////// film funcs ///
//play film

function playFilm(){
    play.style.opacity = 0
    pause.style.display ='block'
    filmScreen.src = filmItems[video_index].src
    filmScreen.play()
    filmName.textContent = filmItems[video_index].parentElement.textContent
    catchFilmCurrent.style.display = 'block'
    catchFilmDuration.style.display = 'block'
    filmName.style.display = 'block'
    filmScreen.style.display = 'block'
    filmLength.style.display = 'block'
}
//pause film
function pauseFilm(){
    pause.style.display = 'none'
    play.style.opacity = 1
    filmScreen.pause()
}
//next Film
function nextFilm(){
    video_index ++;
    let lastFilm = filmItems.length-1
    if(video_index > filmItems.length-1 || video_index == filmItems.length-1 ||video_index == filmItems.length){//
        video_index = 0
        filmScreen.src = filmItems[video_index+1].src
        filmItems[video_index].play()
        filmName.textContent = filmItems[video_index].parentElement.textContent
        filmItems[lastFilm].pause()//pause last one
    }if(video_index === filmItems.length){//لسه في مشكلة انه بيشغل اللى ع الجنب
        console.log(filmScreen.src = filmItems[0].src)
    }
    else{
        playFilm()
        filmItems[video_index-1].pause()
    }
}
//prev film
function prevFilm(){
    video_index --;
    if(video_index < 0 || video_index == filmItems.length-1){//
        video_index = filmItems.length-1
        filmItems[video_index].play()
        filmItems[0].pause()//pause 0 one
        filmName.textContent = filmItems[video_index].parentElement.textContent
    }else{
        playFilm()
        filmItems[video_index+1].pause()//pause prev one
    }
}
//// events (sound) ////
//play
changePlayIcon.addEventListener('click',()=>{
    playMusic()
    changeSoundBack()
    //stop play clicked song
    if(stopSong){
        stopSong.play()
        nameView.textContent = stopSong.parentElement.textContent
        getAllMusic[cur_index].pause()
    }
})
//pause
changePauseIcon.addEventListener('click',()=>{
    pauseMusic()
})
//next
playNextSound.addEventListener('click',()=>{
    stopClickedSong()
    playMusic()
    nextMusic()
    changeSoundBack()
    stopSong ? clearClickedColor ='unset' :console.log('color')
})
//prev 
playPrevSound.addEventListener('click',()=>{
    playMusic()
    prevMusic()
    changeSoundBack()
    stopClickedSong()
    stopSong ? clearClickedColor ='unset' :console.log('color')
})

//fetching data
fetch('js/json/music.json')
.then(Response => Response.json())
.then(data => {
    //abstract sound data 
    asbtractSoundData = data.sound
    // loadMusic(asbtractSoundData[cur_index])
    //loop in sound data
    asbtractSoundData.forEach((sound)=> {
        // list items
        let soundContainerLi = document.createElement('li')
        soundContainerLi.innerHTML = sound.name
        soundContainerLi.className = sound.class
        //audio sound
        let soundContainerAudio = document.createElement('audio')
        soundContainerAudio.id = sound.id
        soundContainerAudio.src = sound.link
        soundContainerAudio.type = sound.type
        //appending
        soundContainerLi.appendChild(soundContainerAudio) 
        soundContainerUl.appendChild(soundContainerLi)
    });
    getAllMusic = document.querySelectorAll('.sound-container li audio')
    //play clicked song
    let catchClickedSong = document.querySelectorAll('.sound-container li')
    playClickedSong = catchClickedSong
    function clickedSongToPlay(){
        playClickedSong.forEach((ele,ind)=>{
            ele.addEventListener('click',e=>{
                playClickedSong.forEach(el=>{
                    el.classList.remove('activate')
                    if(!el.matches('activate')){
                        el.style.color = 'unset'
                        el.children.sound.pause()
                    }
                })
                ele.classList.add('activate')
                stopSong =ele.children.sound
                clearClickedColor = ele.style.color
                if(ele.classList.contains('activate')){
                    ele.children.sound.play()
                    showPause()
                    nameView.textContent = ele.textContent
                    ele.style.color = 'lawngreen'
                    changePlayPause()
                    pauseMusic()
                }
            })
        })
    }
    clickedSongToPlay()
    //current time
    let timeLineProg = document.querySelector('.timeline')
    let getTimeLineBar = document.querySelector('.timeline .timeline-bar')
    function current(){ 
        getAllMusic.forEach((ele,index)=>{
            let catchDuration,catchCurrentTime ;
            ele.addEventListener('timeupdate',e=>{
                //cureent time
                catchCurrentTime = e.target.currentTime
                let secCurrentTime = Math.floor((catchCurrentTime % 60))
                let minCurrentTime = Math.floor((catchCurrentTime / 60))
                getCurrentTime.textContent = `${minCurrentTime}:${secCurrentTime}`
                //total time
                catchDuration = e.target.duration
                let totalMin = Math.floor(catchDuration / 60)
                let totalSec = Math.floor(catchDuration % 60)
                let totalTime = `${totalMin} : ${totalSec}`
                getDuration.textContent = totalTime
                //flip song when it finished
                catchCurrentTime == catchDuration ? nextMusic() : console.log('stop')
                //timing-bar
                let timingBar = (catchCurrentTime / catchDuration) * 100
                getTimeLineBar.style.width = `${timingBar}%`
                timeLineProg.addEventListener('click',(e)=>{ //get timing bar when click
                    let timingWidth = timeLineProg.clientWidth
                    let timingCilckedWidth = e.offsetX
                    let totalTimingWidth = (timingCilckedWidth/timingWidth)*ele.duration
                    ele.currentTime= `${totalTimingWidth}`
                })
                //show length and current sound
                soundLength.innerHTML = `${index+1}/${getAllMusic.length}`
                if(catchCurrentTime == catchDuration){
                    stopSong.pause()
                    showPlay()
                }
            })
        })
    }
    current()

////// video section //////
abstractVideoData=data.videos
chooseLoop[0].addEventListener('click',()=>{
    filmView.style.display = 'block'
    filmContainer.style.display = 'grid'
    abstractVideoData.forEach((film,index)=>{
        // list items
        let filmContainerLi = document.createElement('li')
        filmContainerLi.innerHTML = film.name
        //audio sound
        let filmContainerVideo = document.createElement('video')
        filmContainerVideo.id = film.id
        filmContainerVideo.src = film.link
        //appending
        filmContainerLi.appendChild(filmContainerVideo) 
        filmContainer.appendChild(filmContainerLi)
    })
    filmItems = document.querySelectorAll('video')
    function filmCurrent(){
        filmItems.forEach((el,filmIndex)=>{
            let filmCurrentTime,filmDuration
            el.addEventListener('timeupdate',(e)=>{
                filmCurrentTime = e.target.currentTime
                filmDuration = e.target.duration
                //total current
                let filmSecond = Math.floor(filmCurrentTime % 60)
                let filmMinute = Math.floor(filmCurrentTime / 60)
                let filmTotalCurrentTime = `${filmMinute}:${filmSecond}`
                catchFilmCurrent.textContent = filmTotalCurrentTime
                //total duration
                let durationSecond = Math.floor(filmDuration % 60)
                let durationMinute = Math.floor(filmDuration / 60)
                let filmTotalDuration = `${durationMinute}:${durationSecond}`
                catchFilmDuration.textContent = filmTotalDuration
                //timing bar
                filmTimeline.style.display = 'block'
                let filmWidth = (filmCurrentTime / filmDuration) * 100
                filmTimelineBar.style.width = `${filmWidth}%`
                filmTimeline.addEventListener('click',(e)=>{ //get timing bar when click
                    let filmTimeWidth = filmTimeline.clientWidth
                    let filmTimelineClicked = e.offsetX
                    let filmTotalTime = (filmTimelineClicked/filmTimeWidth)*el.duration
                    el.currentTime= `${filmTotalTime}`
                })
                //filp auto
                if(filmTotalCurrentTime == filmTotalDuration){
                    nextFilm()
                }
                //show film length and current film
                filmLength.innerHTML = `${video_index+1}/${filmItems.length-1}`
            })
        })
    }
   filmCurrent()
    //events

    //play
    play.addEventListener('click',()=>{
        playFilm()
        document.querySelector('.film-screen').style.display = 'block'
    })
    //pause
    pause.addEventListener('click',()=>{
        pauseFilm()
    })
     //next
     nextIcon.addEventListener('click',()=>{
        playFilm()
        nextFilm()
    })
     //prev
     prevIcon.addEventListener('click',()=>{
        playFilm()
        prevFilm()
    })
})
})

///// dark mode /////
function darkMode(){
    darkModeIcon.addEventListener('click',()=>{
        darkModeSection.classList.toggle('darkMode')
        darkModeIcon.classList.toggle('fa-sun')
    })
}
darkMode();

//load section
setTimeout(load,2000)
function load(){
        document.querySelector('.load').remove()
}

/////// mobile section //////////
//show /hide nav
mobileNavIcon.addEventListener('click',()=>{
    mobileLinks.classList.toggle('links-toggle')
})
//create pop up 
mobileLinksLi.addEventListener('click',()=>{
    let popUp = document.createElement('div')
        popUp.className = 'popup'
    let closeIcon = document.createElement('span')
        closeIcon.className = 'close-btn'
    let closeIconText = document.createTextNode('x')
    closeIcon.appendChild(closeIconText)
    popUp.appendChild(closeIcon)
    popUp.appendChild(settingSection)
    document.body.appendChild(popUp)
   //close nav
    document.querySelector('.close-btn').addEventListener('click',(e)=>{
        e.target.parentElement.remove()
        mobileLinks.classList.remove('links-toggle')
    })
})
