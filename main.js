AOS.init({
    duration: 1000,
});
const wr = document.querySelector("#waiting_room")
const inv = document.querySelector("#invitation_id")
const days = document.querySelector("#counter-data")
const video = document.querySelector("#invitation-video")
const videoBtn = document.querySelector("#invitation-video-btn")
const letsRockImg = document.querySelector("#lets-rock")
const form = document.forms["music-selection-form"]
const scrollIcon = document.getElementById("scroll-icon-id")
const verEjemploBtn = document.getElementById("ejemplo-sobre")
const verEjemploImg = document.getElementById("sobre-ejemplo-id")
let fullscreen = false
let posicionScrollAnterior = window.scrollY
let alturaInicial = 0.032
let crecimiento = 0.0083

function getDaysUntilWedding() {
    let todayDate = new Date();
    let weddingDate = new Date(2024, 2, 9);
    days.textContent = Math.ceil((weddingDate - todayDate) / (1000 * 60 * 60 * 24))
    setTimeout(() => {
        scrollIcon.remove()
    }, 5000)
}

async function playVideoInvitation() {
    video.classList.remove("video-display")
    if (video.requestFullscreen) {
        await video.requestFullscreen()
    }
    video.muted = false
    video.play()
}

function handleExitFullscreen() {
    if (fullscreen) {
        video.classList.add("video-display")
        video.muted = true
        video.pause()
        fullscreen = false
    } else {
        fullscreen = true
    }
}

async function handleSubmit(event) {
    try {
        event.preventDefault()
        letsRockImg.classList.add("animation-send")
        await fetch('https://script.google.com/macros/s/AKfycbxitht-uuQkQ0_u2MOIMQJKTOQtj1FuN0VM6zIVXyt2k1Ox8WP6JUiP6RkdYqGSSlRr/exec', { method: 'POST', body: new FormData(form) })
        letsRockImg.classList.remove("animation-send")
        form.reset()
    } catch (error) {
        console.log(error)
    }
}

function handleEjemplo() {
    verEjemploImg.classList.remove("close-img")
}

function handleCloseEjemplo() {
    verEjemploImg.classList.add("close-img")
}

window.onload = getDaysUntilWedding;
videoBtn.addEventListener("click", playVideoInvitation)
video.onfullscreenchange = handleExitFullscreen
video.addEventListener("ended", () => video.classList.add("video-display"))
video.addEventListener("pause", () => video.classList.add("video-display"))
form.addEventListener('submit', handleSubmit)
verEjemploBtn.addEventListener("click", handleEjemplo)
verEjemploImg.addEventListener("click", handleCloseEjemplo)