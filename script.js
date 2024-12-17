// Функция для переключения отображения разделов

function toggleSection(sectionId, authorId) {
    const section = document.getElementById(sectionId);
    const mainDescription = document.getElementById('main-description');
    const returnButton = document.getElementById('return-button');
    const isVisible = section.style.display === "block";

    // Скрываем все разделы и снимаем подсветку со всех авторов
    document.querySelectorAll('.author-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.author').forEach(el => el.classList.remove('active'));

    // Отображаем выбранный раздел и фотографию автора, если он не виден
    if (!isVisible) {
        section.style.display = 'block';
        document.getElementById(authorId).classList.add('active');
        mainDescription.style.display = 'none';
        returnButton.style.display = 'block';
    } else {
        mainDescription.style.display = 'block';
        returnButton.style.display = 'none';
    }
}

// Функция для возврата на главную страницу
function returnToMain() {
    document.querySelectorAll('.author-content').forEach(el => el.style.display = 'none');
    document.getElementById('main-description').style.display = 'block';
    document.getElementById('return-button').style.display = 'none';
    document.querySelectorAll('.author').forEach(el => el.classList.remove('active'));
}

let selectedSong = '';
const audio = document.getElementById('background-music');
const playPauseButton = document.getElementById('play-pause');
let isTrackLoaded = false;

function loadMusicList() {
    const musicList = document.getElementById('music-list');
    const songs = [
        'Litvin zhi_shi.mp3',
        "mal'chik vstavil.mp3",
        "Lizogub DEVOCHKA_UJENSDEJJ.mp3",
        "lipsi ha boost.mp3",
        "Оксана Почепа Позвони.mp3"
    ];

    songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = song;
        li.classList.add('music-item');
        li.addEventListener('mouseover', () => li.classList.add('hovered'));
        li.addEventListener('mouseout', () => li.classList.remove('hovered'));
        li.addEventListener('click', () => toggleSelection(li, song));
        musicList.appendChild(li);
    });
}

function toggleSelection(selectedLi, song) {
    if (selectedSong === song) {
        selectedSong = '';
        selectedLi.classList.remove('selected');
    } else {
        selectedSong = song;
        highlightSelectedSong(selectedLi);
        isTrackLoaded = false;
    }
}

function highlightSelectedSong(selectedLi) {
    document.querySelectorAll('.music-item').forEach(item => item.classList.remove('selected'));
    selectedLi.classList.add('selected');
}

function togglePlay() {
    if (selectedSong) {
        if (!isTrackLoaded) {
            audio.src = 'sound/' + selectedSong;
            audio.load();
            isTrackLoaded = true;
        }
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = '⏸️';
        } else {
            audio.pause();
            playPauseButton.textContent = '▶️';
        }
    } else {
        alert('Выберите трек из списка, прежде чем нажимать "Плей"!');
    }
}

function toggleVersionMenu() {
    var menu = document.getElementById("version-menu");
    var returnButton = document.querySelector("#invokergames-section .button-container a[href='#vonder-section']");

    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        if (returnButton) {
            returnButton.style.display = "none"; // Скрываем кнопку "Вернуться к выбору игр"
        }
    } else {
        menu.style.display = "none";
        if (returnButton) {
            returnButton.style.display = "block"; // Показываем кнопку "Вернуться к выбору игр"
        }
    }
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.textContent = '▶️';
    isTrackLoaded = false;
}

audio.addEventListener('ended', () => {
    playPauseButton.textContent = '▶️';
    isTrackLoaded = false;
});

function setVolume(value) {
    audio.volume = value;
}

window.onload = loadMusicList;
