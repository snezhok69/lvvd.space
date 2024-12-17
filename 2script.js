document.addEventListener("DOMContentLoaded", () => {
    // Плавное появление текста при загрузке страницы
    document.querySelector('.center-description').classList.add('visible');
});

window.onload = function() {
    const releaseIds = [1, 2, 3, 4, 5]; // Здесь перечислены все release_id, которые у вас есть
    releaseIds.forEach(id => {
        loadText(id); // Загружаем текст для каждого release_id
    });
};

// Установка конечных дат для каждого таймера
const tictactoeEndDate = new Date("2024-11-29T00:00:00"); // Пример даты для "Крестики Нолики"
const invokerEndDate = new Date("2024-11-29T00:00:00");   // Пример даты для InvokerGames

function updateCountdown(id, endDate) {
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById(id).innerHTML = `
            <span>${days}</span>д : <span>${hours}</span>ч : 
            <span>${minutes}</span>м : <span>${seconds}</span>с
        `;
    } else {
        document.getElementById(id).textContent = "Обновление уже вышло!";
    }
}

// Запуск таймеров
setInterval(() => {
    updateCountdown("invokerCountdown", invokerEndDate);
    updateCountdown("tictactoeCountdown", tictactoeEndDate);
}, 1000);

let currentEditId; // Переменная для хранения текущего ID редактируемого элемента

// Открытие модального окна редактирования по ID элемента
function openEditModal(id) {
    currentEditId = id;

    // Получаем текущий текст из элемента и заполняем поле для редактирования
    const content = document.getElementById(`update-content-${id}`).innerText;
    document.getElementById("editTextArea").value = content;

    // Отображаем модальное окно
    document.getElementById("editModal").style.display = "flex";
}

// Закрытие модального окна редактирования
function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

// Сохранение изменений и обновление текста с использованием AJAX для всех пользователей
function saveEdit() {
    const newText = document.getElementById("editTextArea").value;

    if (!newText) {
        alert("Введите текст для сохранения.");
        return;
    }

    fetch("save_text.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `release_id=${currentEditId}&text=${encodeURIComponent(newText)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById(`update-content-${currentEditId}`).innerText = newText;
            closeEditModal();
        } else {
            alert(data.message || "Произошла ошибка при сохранении текста.");
        }
    })
    .catch(error => {
        console.error("Ошибка при отправке запроса:", error);
    });
}

function loadText(releaseId) {
    fetch(`load_text.php?release_id=${releaseId}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById(`update-content-${releaseId}`).innerText = data.text; // Обновляем текст конкретного элемента
        } else {
            console.error(data.message);
        }
    });
}

// Функция для загрузки текста для всех пользователей
function loadText(releaseId) {
    // Отправка запроса на сервер для загрузки сохраненного текста
    fetch(`load_text.php?release_id=${releaseId}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Обновляем текст для элемента с нужным ID
            document.getElementById(`update-content-${releaseId}`).innerText = data.text;
        } else {
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error("Ошибка при загрузке текста:", error);
    });
}

// Загрузка текста при загрузке страницы
document.addEventListener("DOMContentLoaded", loadText);

function scrollToSection(authorId, sectionId) {
    // Скрыть все секции перед показом новой
    const authors = document.querySelectorAll('.author-content');
    authors.forEach((author) => {
        author.style.display = 'none';
    });

    // Показать нужный раздел
    document.getElementById(authorId).style.display = 'block';
    document.getElementById(sectionId).style.display = 'block';

    // Прокрутить к секции
    document.getElementById(authorId).scrollIntoView({ behavior: 'smooth' });
}

function openUpdateModal(type) {
    let modal = document.getElementById("updateModal");
    let modalContent = document.getElementById("modalContent");

    // Скрытие основного содержимого страницы
    document.querySelector('.header').classList.add('hidden-content');
    document.querySelector('.updates-content').classList.add('hidden-content');
    document.querySelector('.return-button1').classList.add('hidden-content');
    document.querySelector('.footer').classList.add('hidden-content');
    document.querySelector('.footer-text').classList.add('hidden-content');

    // **Скрытие таймера**
    document.querySelector('.timer-container').classList.add('hidden-content');

    // Добавляем контент в модальное окно
    if (type === 'realse_tic_tac_toe') {
        modalContent.innerHTML = `
            <h2>Крестики нолики Релиз 1.0.0</h2>
<ul>
  <li>Сегодня мы рады представить наш новый проект — онлайн-игру "Крестики-нолики"!</li>
  <li>Теперь любимая классическая игра доступна в удобном формате, где бы вы ни находились.</li>
  <li>Особенности игры:
    <ul>
      <li>Динамичный и интуитивный интерфейс, подходящий для игроков всех возрастов.</li>
      <li>Онлайн-режим, позволяющий играть с друзьями или другими игроками по всему миру.</li>
      <li>Возможность выбора уровня сложности, чтобы игра подходила как для новичков, так и для опытных игроков.</li>
      <li>История матчей и статистика побед, чтобы вы могли отслеживать свои успехи.</li>
    </ul>
  </li>
  <li>Почему стоит попробовать нашу версию:
    <ul>
      <li>Простота и доступность "Крестиков-ноликов" в сочетании с новыми возможностями для более увлекательного игрового процесса.</li>
      <li>Быстрые игры, которые можно начинать и завершать в любое время, идеально подходят для короткого отдыха или тренировки ума.</li>
      <li>Постоянные обновления и поддержка, благодаря которым игра продолжит улучшаться и получать новые функции.</li>
    </ul>
  </li>
  <li>Присоединяйтесь и наслаждайтесь игрой прямо сейчас — классика никогда не была такой увлекательной!</li>
</ul> 
        `;
    } else if (type === 'invokergames_realese') {
        modalContent.innerHTML = `
            <h2>InvokerGames релиз 1.0.0 (C#)</h2>
<ul>
    <li><strong>Новый релиз от InvokerGames: управляй могуществом стихии вместе с Invoker!</strong></li>
    
    <li>InvokerGames рады представить новый уникальный игровой опыт для всех поклонников Dota 2 и Invoker! Эта игра создана на платформе C#, чтобы воплотить силу элементов и магию Invoker в новом формате, который позволит игрокам еще глубже погрузиться в мир мощных заклинаний и тактической магии.</li>
    
    <li><strong>Открой мощь 10 заклинаний Invoker</strong></li>
    
    <li>В этой игре вас ждут все уникальные способности Invoker, которые делают его одним из самых сложных и увлекательных героев в мире Dota. Воссоздайте легендарные комбинации с помощью <em>Quas</em>, <em>Wex</em> и <em>Exort</em> — трех стихий, которые позволяют Invoker использовать до 10 различных заклинаний, от разрушительных метеоров до ледяных стен, замедляющих ваших врагов.</li>
    
    <li>
        <strong>Quas</strong>: Магия холода и восстановления. Повышает живучесть и дает доступ к заклинаниям защиты.
    </li>
    
    <li>
        <strong>Wex</strong>: Сила скорости и ураганов. Управляйте временем и пространством, ускоряя себя и замедляя врагов.
    </li>
    
    <li>
        <strong>Exort</strong>: Огненная мощь, увеличивающая силу атаки и позволяющая вызывать разрушительные метеориты и солнечные взрывы.
    </li>
    
    <li>Каждое заклинание требует тонкого управления и правильного сочетания сфер, создавая невероятные возможности для стратегий и атак.</li>
    
    <li><strong>Особенности игры:</strong></li>
    
    <li><strong>Сложные комбинации</strong>: Погружайтесь в обучение и постепенно овладевайте сложными комбинациями Invoker, повторяя его знаменитые комбинации заклинаний.</li>
    
    <li><strong>Гибкий игровой процесс</strong>: Используйте навыки, чтобы адаптироваться к изменяющимся условиям боя, и найдите лучший способ использования каждой способности.</li>
    
    <li><strong>Соревновательный элемент</strong>: Сражайтесь с другими игроками или AI в аркадных боях и испытаниях, где важна скорость реакции и точность.</li>
    
    <li><strong>Будь магом, который повелевает стихиями</strong></li>
    
    <li>Испытайте на себе роль одного из самых сложных героев во вселенной Dota! Приготовьтесь стать мастером магии Invoker и покажите, насколько вы способны управлять мощью стихий. Скачивайте игру и отправляйтесь в путешествие по миру тактической магии и стратегии!</li>
</ul>
        `;
    } else if (type === 'invokergames_unity_realese') {
        modalContent.innerHTML = `
            <h2>InvokerGames релиз 1.5 (Unity)</h2>
<ul>
    <li><strong>Представляем InvokerGames: Испытай магию Invoker в новом измерении на Unity!</strong></li>
    
    <li>InvokerGames с гордостью объявляет о запуске новой игры, основанной на персонаже Invoker из Dota 2, разработанной с использованием мощных возможностей Unity. Это уникальное игровое путешествие подарит вам шанс стать мастером магии, исследуя мир, наполненный захватывающими боями и стратегическими комбинациями заклинаний.</li>
    
    <li><strong>Открой тайны 10 заклинаний Invoker</strong></li>
    
    <li>В этой игре вы сможете использовать все уникальные способности Invoker, которые сделали его культовым героем. Сочетая элементы <em>Quas</em>, <em>Wex</em> и <em>Exort</em>, вы сможете реализовать до 10 различных заклинаний, от метеоров до ледяных стен. Каждый ход требует тщательной стратегии и точного исполнения.</li>
    
    <li>
        <strong>Quas</strong>: Сила холода и защиты. Повышает живучесть и открывает доступ к уникальным защитным заклинаниям.
    </li>
    
    <li>
        <strong>Wex</strong>: Могущество скорости и времени. Управляйте пространством, ускоряя свои действия и замедляя врагов.
    </li>
    
    <li>
        <strong>Exort</strong>: Огненная мощь, увеличивающая вашу атакующую силу и позволяющая вызывать разрушительные заклинания.
    </li>
    
    <li>Каждое заклинание требует от вас умения и опыта, открывая безграничные возможности для создания эффективных стратегий.</li>
    
    <li><strong>Основные особенности игры:</strong></li>
    
    <li><strong>Интуитивное управление</strong>: Благодаря использованию Unity, управление персонажем и заклинаниями стало максимально удобным и отзывчивым.</li>
    
    <li><strong>Динамичные бои</strong>: Сражайтесь с врагами в реалистичных боях, где каждое ваше действие имеет значение.</li>
    
    <li><strong>Разнообразие режимов игры</strong>: Испытайте свои навыки в различных режимах — от одиночных заданий до многопользовательских сражений.</li>
    
    <li><strong>Графика и анимация</strong>: Наслаждайтесь качественной графикой и плавными анимациями, которые создают незабываемую атмосферу.</li>
    
    <li><strong>Стань мастером магии Invoker</strong></li>
    
    <li>Присоединяйтесь к нам в этом увлекательном приключении и станьте настоящим магом, способным управлять стихиями. Погружайтесь в мир стратегий и тактики, совершенствуйте свои навыки и показывайте мастерство в каждой битве. Скачивайте игру и начните свой путь к величию в мире Invoker!</li>
</ul>
        `;
    } else if (type === 'patch') {
        modalContent.innerHTML = `
            <h2>nvokerGames (Unity) PATCH 1.6(beta)</h2>
<ul>
            <li>В этом обновлении была добавлена кнопка "выйти из игры".</p>
            <li>Был переработан интерфейс бесконечного режима.</p>
            <li>Исправлены баги.</p>
            </ul>
        `;
    } else if (type === 'hotfix') {
        modalContent.innerHTML = `
            <h2>Крестики нолики hotfix 1.0.1</h2>
<ul>
    <li><strong>В этом обновлении улучшена синхронизация и исправлены ошибки с ресетом поля у клиента. </p>
        `;
    }

    // Показываем модальное окно с добавлением класса 'show'
    modal.classList.add("show");
    modal.style.display = "flex";
}

function closeUpdateModal() {
    let modal = document.getElementById("updateModal");

    // Показ основного содержимого страницы
    document.querySelector('.header').classList.remove('hidden-content');
    document.querySelector('.updates-content').classList.remove('hidden-content');
    document.querySelector('.return-button1').classList.remove('hidden-content');
    document.querySelector('.footer').classList.remove('hidden-content');
    document.querySelector('.footer-text').classList.remove('hidden-content');

    // **Отображение таймера**
    document.querySelector('.timer-container').classList.remove('hidden-content');

    // Убираем модальное окно
    modal.classList.remove("show");
    modal.style.display = "none";
}
