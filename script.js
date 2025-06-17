// --- Server Status Fetching ---
const SERVER_IP = "85.10.253.236";
const SERVER_PORT = "27056";

// Placeholder for a public API that queries Source servers.
// In a real scenario, you would replace this with an actual endpoint
// from a service that performs Source Query Protocol lookups over HTTP.
// For example, a service using GameDig [5] or a custom backend.
const SERVER_QUERY_API_URL = `https://api.example.com/source-query?ip=${SERVER_IP}&port=${SERVER_PORT}`;

async function fetchServerStatus() {
    try {
        // --- IMPORTANT: Replace this section with an actual API call ---
        // Example with a hypothetical API endpoint:
        // const response = await fetch(SERVER_QUERY_API_URL);
        // const data = await response.json();

        // --- Simulated Data for Demonstration ---
        // This simulates the data structure you'd expect from a Source Query API.
        const data = {
            online: true,
            name: "Tanksu Deathrun Server",
            map: "dr_space_odyssey_v3",
            players: Math.floor(Math.random() * 20) + 5, // Random players between 5 and 24
            max_players: 24,
            duration: Math.floor(Math.random() * 3600) + 120 // Random duration between 2 mins and 1 hour in seconds
        };
        // --- End Simulated Data ---

        if (data.online) {
            document.getElementById('serverStatus').textContent = "Online";
            document.getElementById('serverStatus').style.color = '#28a745'; // Green for online
            document.getElementById('playerCount').textContent = `${data.players}/${data.max_players}`;
            document.getElementById('currentMap').textContent = data.map;

            // Convert duration from seconds to HH:MM:SS
            const durationSeconds = data.duration;
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds % 3600) / 60);
            const seconds = durationSeconds % 60;

            const formattedDuration = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            document.getElementById('mapDuration').textContent = formattedDuration;
        } else {
            document.getElementById('serverStatus').textContent = "Offline";
            document.getElementById('serverStatus').style.color = '#dc3545'; // Red for offline
            document.getElementById('playerCount').textContent = `--/--`;
            document.getElementById('currentMap').textContent = `N/A`;
            document.getElementById('mapDuration').textContent = `N/A`;
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
        document.getElementById('serverStatus').textContent = "Error";
        document.getElementById('serverStatus').style.color = '#ffc107'; // Yellow/Orange for error
        document.getElementById('playerCount').textContent = `--/--`;
        document.getElementById('currentMap').textContent = `N/A`;
        document.getElementById('mapDuration').textContent = `N/A`;
    }
}

// Fetch status initially and then every 30 seconds
fetchServerStatus();
setInterval(fetchServerStatus, 30000);

// --- Star Background Animation ---
const starBackground = document.getElementById('star-background');
const numStars = 100; // Number of small stars
const stars = [];
const repulsionRadius = 100; // Radius around cursor where stars repel (in pixels)
const repulsionForce = 0.5; // How strongly stars move away from cursor

let mouseX = -1000; // Initialize off-screen
let mouseY = -1000;

class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 1; // Star size between 1 and 3 pixels
        this.vx = (Math.random() - 0.5) * 0.1; // Initial horizontal velocity
        this.vy = (Math.random() - 0.5) * 0.1; // Initial vertical velocity

        this.element = document.createElement('div');
        this.element.className = 'star';
        starBackground.appendChild(this.element);

        this.updateStyle();
    }

    updateStyle() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
    }

    animate() {
        // Calculate distance from cursor
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply repulsion force if cursor is within repulsion radius
        if (distance < repulsionRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            // Force magnitude decreases with distance, strongest at cursor center
            const forceMagnitude = (repulsionRadius - distance) / repulsionRadius * repulsionForce;

            this.vx += forceDirectionX * forceMagnitude;
            this.vy += forceDirectionY * forceMagnitude;
        }

        // Update position based on velocity
        this.x += this.vx;
        this.y += this.vy;

        // Dampen velocity to prevent stars from accelerating infinitely
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Wrap stars around screen edges
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;

        this.updateStyle();
    }
}

function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    stars.forEach(star => star.animate());
    requestAnimationFrame(animateStars); // Loop the animation
}

// Update mouse coordinates on mouse movement
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Re-adjust star positions slightly if window is resized (optional, but good practice)
window.addEventListener('resize', () => {
    stars.forEach(star => {
        star.x = Math.random() * window.innerWidth;
        star.y = Math.random() * window.innerHeight;
        star.updateStyle();
    });
});


initStars();
animateStars();
