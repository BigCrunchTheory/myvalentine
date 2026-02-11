document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById("fixed");
    const noBtn = document.getElementById("runawayBtn");
    const header = document.querySelector("h1");
    
    // ========== НАСТРОЙКИ СКОРОСТИ ==========
    const RUNAWAY_SPEED = 300;      // Как далеко убегает от мыши (чем больше, тем быстрее)
    const CLICK_JUMP = 500;         // Как далеко отпрыгивает при клике
    const JITTER = 120;            // Дёрганье (хаотичность движения)
    // ========================================
    
    // Массив фраз для кнопки "Нет"
    const noClickMessages = [
        "не попала",
        "ой, не работает что-ли",
        "почти... но нет",
        "мимо",
        "ещё одна попытка",
        "не судьба",
        "может, всё-таки да",
        "упс, промах",
        "не сегодня",
        "попробуй ещё разок",
        "ты правда хочешь нажать нет",
        "не получается",
        "а если так",
        "сдаёшься",
        "ой, всё"
    ];
    
    let messageIndex = 0;
    
    // Создаем элемент для сообщения и делаем его ДОЧЕРНИМ элементом кнопки
    const messageElement = document.createElement('span');
    messageElement.className = 'no-btn-message';
    messageElement.textContent = noClickMessages[0];
    
    // Добавляем сообщение ВНУТРЬ кнопки "Нет"
    noBtn.appendChild(messageElement);
    
    // Изначально позиционируем кнопки
    function positionButtons() {
        noBtn.style.position = "static";
        yesBtn.style.position = "static";
        
        const container = document.querySelector(".buttons-container");
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.gap = "30px";
        
        noBtn.style.position = "fixed";
        
        const yesBtnRect = yesBtn.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();
        const gap = 30;
        const headerRect = header.getBoundingClientRect();
        
        const totalWidth = yesBtnRect.width + gap + noBtnRect.width;
        const startX = (window.innerWidth - totalWidth) / 2;
        const verticalPosition = headerRect.bottom + 50;
        
        yesBtn.style.position = "fixed";
        yesBtn.style.left = `${startX}px`;
        yesBtn.style.top = `${verticalPosition}px`;
        
        noBtn.style.left = `${startX + yesBtnRect.width + gap}px`;
        noBtn.style.top = `${verticalPosition}px`;
        
        yesBtn.style.zIndex = "100";
        noBtn.style.zIndex = "100";
        
        // Для внутреннего позиционирования текста
        noBtn.style.position = "relative";
    }
    
    positionButtons();
    
    // ========== ТУРБО-РЕЖИМ: ОБРАБОТЧИК ДВИЖЕНИЯ ==========
    noBtn.addEventListener("mousemove", (event) => {
        const btnRect = noBtn.getBoundingClientRect();
        
        // Вычисляем положение мыши относительно центра кнопки
        const mouseX = event.clientX - (btnRect.left + btnRect.width / 2);
        const mouseY = event.clientY - (btnRect.top + btnRect.height / 2);
        
        // СУПЕР-СИЛЬНОЕ отталкивание
        const deltaX = mouseX > 0 ? -RUNAWAY_SPEED : RUNAWAY_SPEED;
        const deltaY = mouseY > 0 ? -RUNAWAY_SPEED : RUNAWAY_SPEED;
        
        // Дёргается в разные стороны (хаотичность)
        const jitterX = (Math.random() - 0.5) * JITTER;
        const jitterY = (Math.random() - 0.5) * JITTER;
        
        // Вычисляем новую позицию с дёрганьем
        let newX = btnRect.left + deltaX + jitterX;
        let newY = btnRect.top + deltaY + jitterY;
        
        // Ограничиваем экраном
        newX = Math.max(0, Math.min(newX, window.innerWidth - btnRect.width));
        newY = Math.max(0, Math.min(newY, window.innerHeight - btnRect.height));
        
        // Мгновенное перемещение (без requestAnimationFrame для максимальной скорости)
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });
    
    // ========== ТУРБО-РЕЖИМ: ОБРАБОТЧИК КЛИКА ==========
    noBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        
        // Получаем сообщение по индексу
        const message = noClickMessages[messageIndex];
        messageElement.textContent = message;
        
        // Делаем текст видимым
        messageElement.style.opacity = '1';
        
        // Увеличиваем индекс
        messageIndex = (messageIndex + 1) % noClickMessages.length;
        
        // МОЩНЫЙ ВЗРЫВНОЙ ОТСКОК ПРИ КЛИКЕ
        const btnRect = noBtn.getBoundingClientRect();
        
        // Супер-сила отскока в случайном направлении
        const randomX = (Math.random() > 0.5 ? 1 : -1) * CLICK_JUMP;
        const randomY = (Math.random() > 0.5 ? 1 : -1) * CLICK_JUMP;
        
        // ДОПОЛНИТЕЛЬНЫЙ ХАОС — кнопка ведёт себя непредсказуемо
        const chaosX = (Math.random() - 0.5) * 200;
        const chaosY = (Math.random() - 0.5) * 200;
        
        let newX = btnRect.left + randomX + chaosX;
        let newY = btnRect.top + randomY + chaosY;
        
        // Ограничиваем экраном
        newX = Math.max(0, Math.min(newX, window.innerWidth - btnRect.width));
        newY = Math.max(0, Math.min(newY, window.innerHeight - btnRect.height));
        
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        
        // Через 2 секунды текст исчезает
        setTimeout(() => {
            messageElement.style.opacity = '0';
        }, 2000);
    });
    
    // ОБРАБОТЧИК НАЖАТИЯ НА КНОПКУ "ДА"
    yesBtn.addEventListener("click", () => {
        messageElement.style.opacity = '0';
        
        const winMessage = document.createElement('div');
        winMessage.className = 'win-message';
        winMessage.textContent = 'Люблю тебя!';
        document.body.appendChild(winMessage);
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                heart.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }
        
        yesBtn.style.opacity = '0.5';
        noBtn.style.opacity = '0.5';
        yesBtn.disabled = true;
        noBtn.disabled = true;
    });
    
    // Обновляем позиции при изменении размера окна
    window.addEventListener("resize", () => {
        positionButtons();
    });
});