/* ==========================================================
   AVENMARK WEBSITE
   SCRIPT.JS — WEATHER + NEBULA
========================================================== */

const weatherElement = document.getElementById("weather");

/* ==========================================================
   LOAD WEATHER (Columbia, SC)
========================================================== */

async function loadWeather() {
    try {
        const latitude = 34.0007;
        const longitude = -81.0348;

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
        );

        const data = await response.json();

        const temperature = Math.round(data.current.temperature_2m);
        const weatherCode = data.current.weather_code;
        const condition = getWeatherCondition(weatherCode);

        weatherElement.textContent = `Columbia, SC • ${temperature}°F • ${condition}`;

    } catch (error) {
        weatherElement.textContent = "Columbia, SC weather unavailable";
        console.error("Weather error:", error);
    }
}

/* ==========================================================
   WEATHER CODE → DESCRIPTION
========================================================== */

function getWeatherCondition(code) {
    const conditions = {
        0: "Clear Sky",
        1: "Mostly Clear",
        2: "Partly Cloudy",
        3: "Cloudy",

        45: "Fog",
        48: "Fog",

        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",

        61: "Light Rain",
        63: "Rain",
        65: "Heavy Rain",

        71: "Light Snow",
        73: "Snow",
        75: "Heavy Snow",

        80: "Rain Showers",
        81: "Rain Showers",
        82: "Heavy Showers",

        95: "Thunderstorms",
        96: "Thunderstorms",
        99: "Thunderstorms"
    };

    return conditions[code] || "Unknown";
}

/* ==========================================================
   AVENMARK NEBULA — CALM + ELEGANT PARTICLE FIELD
========================================================== */

const canvas = document.getElementById("nebulaCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

/* Particle constructor */
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;

        this.color = `rgba(196, 122, 69, ${Math.random() * 0.4})`; // Avenmark bronze glow
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // gentle pull toward mouse
        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = dx * dx + dy * dy;

            if (dist < 90000) {
                this.x += dx * -0.0005;
                this.y += dy * -0.0005;
            }
        }

        // wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

/* Create particles */
function initParticles() {
    particles = [];
    const count = Math.floor(window.innerWidth / 8);

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

/* Animation loop */
function animateNebula() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateNebula);
}
animateNebula();

/* ==========================================================
   INIT
========================================================== */

loadWeather();
