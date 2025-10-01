// script.js

// مثال: لما الصفحة تجهز، اعرض رسالة في الكونسول
document.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to Helwan Linux website!");
});

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector('img[src*="logo"]');
    if (!logo) return;

    // حاوية المطر بالنسبة للوجو
    const rainContainer = document.createElement("div");
    rainContainer.style.position = "absolute";
    rainContainer.style.pointerEvents = "none";
    rainContainer.style.overflow = "visible";
    rainContainer.style.width = logo.offsetWidth + "px";
    rainContainer.style.height = logo.offsetHeight + "px";
    rainContainer.style.top = logo.offsetTop + "px";
    rainContainer.style.left = logo.offsetLeft + "px";
    logo.parentElement.appendChild(rainContainer);

    function createRainDrop() {
        const drop = document.createElement("div");
        drop.style.position = "absolute";
        drop.style.width = "2px";
        drop.style.height = Math.random() * 10 + 10 + "px";
        drop.style.background = "rgba(255,255,255,0.7)";
        drop.style.top = "-20px";
        drop.style.left = Math.random() * logo.offsetWidth + "px";
        drop.style.animation = `logoRain ${Math.random() * 0.5 + 0.5}s linear forwards`;
        rainContainer.appendChild(drop);
        drop.addEventListener("animationend", () => drop.remove());
    }

    // keyframes للمطر
    const style = document.createElement("style");
    style.textContent = `
        @keyframes logoRain {
            to { transform: translateY(${logo.offsetHeight + 20}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    let rainInterval;
    let lightningInterval;

    logo.addEventListener("mouseenter", () => {
        // دوران اللوجو مستمر عند المرور
        logo.style.animation = "spin 1.8s linear infinite";

        // بدء المطر
        rainInterval = setInterval(createRainDrop, 50);

        // البرق كل ثانيتين
        lightningInterval = setInterval(() => {
            logo.style.filter = "brightness(2) drop-shadow(0 0 20px white)";
            setTimeout(() => logo.style.filter = "", 150);
        }, 2000);
    });

    logo.addEventListener("mouseleave", () => {
        // إيقاف المطر والبرق والدوران
        clearInterval(rainInterval);
        clearInterval(lightningInterval);
        logo.style.animation = "";
        logo.style.filter = "";
    });
});
