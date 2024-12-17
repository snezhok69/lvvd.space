function toggleAuthorSection(element, author) {
    const section = document.getElementById(`section-${author}`);
    const isActive = element.classList.contains('active');

    // Сброс состояния всех авторов, разделов и инструкций
    document.querySelectorAll('.author').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.section-content').forEach(section => section.style.display = 'none');
    document.querySelectorAll('.instruction-content').forEach(content => content.style.display = 'none');
    document.getElementById('wiki-header').style.display = 'block';

    // Скрыть кнопку "Вернуться к выбору игры"
    document.getElementById('back-to-game-selection').style.display = 'none';

    if (!isActive) {
        element.classList.add('active');
        document.getElementById('wiki-header').style.display = 'none';

        // Проверяем, какой автор был выбран, и показываем соответствующий блок выбора игры
        if (author === 'lavand7a') {
            document.getElementById('game-selection-lavand7a').style.display = 'block';
        } else if (author === 'vonder') {
            document.getElementById('game-selection-vonder').style.display = 'block';
        }

        // Показать кнопку "Вернуться на вики страницу"
        document.getElementById('back-to-wiki').style.display = 'block';
    } else {
        // Если уже активен, скрыть кнопку "Вернуться на вики страницу"
        document.getElementById('back-to-wiki').style.display = 'none';
    }
}


function showInstructions(game) {
    // Скрываем блоки выбора игры lavand7a и vonder
    document.getElementById('game-selection-lavand7a').style.display = 'none';
    document.getElementById('game-selection-vonder').style.display = 'none';

    // Скрываем все инструкции и активируем нужную
    document.querySelectorAll('.instruction-content').forEach(content => content.style.display = 'none');
    document.getElementById(`instructions-${game}`).style.display = 'block';

    // Скрыть кнопку "Вернуться на вики страницу" и показать "Вернуться к выбору игры"
    document.getElementById('back-to-wiki').style.display = 'none';
    document.getElementById('back-to-game-selection').style.display = 'block';
}

// Функция для открытия модального окна
// Функция для открытия модального окна
function openModal(instructionId) {
    // Создаем контейнер для модального окна, если его еще нет
    if (!document.getElementById('modal-container')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.classList.add('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-content">
                <button class="close-modal close" onclick="closeModal()">&times;</button>
                <div id="modal-instruction-content"></div>
            </div>
        `;
        document.body.appendChild(modalContainer);
    }

    // Заполняем модальное окно контентом инструкции
    const modalContent = document.getElementById('modal-instruction-content');
    const instructionContent = document.getElementById(instructionId);

    if (instructionContent) {
        modalContent.innerHTML = instructionContent.innerHTML;
    }

    // Показываем модальное окно
    document.getElementById('modal-container').style.display = 'flex';
}

// Функция для закрытия модального окна
function closeModal() {
    document.getElementById('modal-container').style.display = 'none';
}

function returnToGameSelection() {
    // Скрываем все разделы и инструкции
    document.querySelectorAll('.section-content').forEach(section => section.style.display = 'none');
    document.querySelectorAll('.instruction-content').forEach(content => content.style.display = 'none');

    // Определяем, какой раздел нужно снова показать
    if (document.querySelector('.author.active').textContent.includes('lavand7a')) {
        document.getElementById('game-selection-lavand7a').style.display = 'block';
    } else if (document.querySelector('.author.active').textContent.includes('vonder')) {
        document.getElementById('game-selection-vonder').style.display = 'block';
    }

    // Показать кнопку "Вернуться на вики страницу"
    document.getElementById('back-to-wiki').style.display = 'block';

    // Скрыть кнопку "Вернуться к выбору игры"
    document.getElementById('back-to-game-selection').style.display = 'none';
}

function toggleSubSection(element, sectionId) {
    const isActive = element.classList.contains('active');

    // Скрыть все активные подразделы и инструкции
    document.querySelectorAll('.sub-section').forEach(sub => sub.classList.remove('active'));
    document.querySelectorAll('.instruction-content').forEach(content => content.style.display = 'none');

    if (!isActive) {
        element.classList.add('active');
        document.getElementById(`instruction-${sectionId}`).style.display = 'block';
    }
}

