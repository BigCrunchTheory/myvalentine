document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById("fixed");
    const noBtn = document.getElementById("runawayBtn");
    const header = document.querySelector("h1");
    
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
    
    // ОЧЕНЬ ВАЖНО: добавляем сообщение ВНУТРЬ кнопки "Нет"
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
        
        // Убеждаемся, что кнопка имеет position relative для абсолютного позиционирования текста
        noBtn.style.position = "fixed";
        noBtn.style.position = "relative"; // Переопределяем для внутреннего позиционирования
    }
    
    positionButtons();
    
    // Плавное движение кнопки
    let animationFrame;
    noBtn.addEventListener("mousemove", (event) => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        animationFrame = requestAnimationFrame(() => {
            const btnRect = noBtn.getBoundingClientRect();
            const maxDistance = 100;
            
            const mouseX = event.clientX - (btnRect.left + btnRect.width / 2);
            const mouseY = event.clientY - (btnRect.top + btnRect.height / 2);
            
            const deltaX = mouseX > 0 ? -maxDistance : maxDistance;
            const deltaY = mouseY > 0 ? -maxDistance : maxDistance;
            
            let newX = btnRect.left + deltaX;
            let newY = btnRect.top + deltaY;
            
            newX = Math.max(0, Math.min(newX, window.innerWidth - btnRect.width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - btnRect.height));
            
            noBtn.style.left = `${newX}px`;
            noBtn.style.top = `${newY}px`;
        });
    });
    
    // ОБРАБОТЧИК НАЖАТИЯ НА КНОПКУ "НЕТ"
    noBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        
        // Получаем сообщение по индексу
        const message = noClickMessages[messageIndex];
        messageElement.textContent = message;
        
        // ДЕЛАЕМ ТЕКСТ ВИДИМЫМ
        messageElement.style.opacity = '1';
        
        // Увеличиваем индекс
        messageIndex = (messageIndex + 1) % noClickMessages.length;
        
        // Отпрыгивание
        const btnRect = noBtn.getBoundingClientRect();
        const randomX = (Math.random() > 0.5 ? 1 : -1) * 150;
        const randomY = (Math.random() > 0.5 ? 1 : -1) * 150;
        
        let newX = btnRect.left + randomX;
        let newY = btnRect.top + randomY;
        
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
    
    window.addEventListener("resize", () => {
        positionButtons();
    });
});