<<<<<<< HEAD
// Matrix Rain Effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to display in the matrix rain
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const nums = '0123456789';
    const binary = '01';
    
    // Combine all character sets
    const chars = katakana + latin + nums + binary;

    // Matrix columns (1 per 20px of width)
    const columns = Math.floor(canvas.width / 20);
    // Array to track the y position of each column
    const drops = [];
    // Array to track the x position of each column (for mouse interaction)
    const xPositions = [];
    
    // Mouse position tracking
    let mouseX = -100;
    let mouseY = -100;
    const mouseRadius = 100; // Radius of effect around mouse
    const maxDisplacement = 5; // Maximum distance characters can be pushed

    // Initialize all drops to start at random positions
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
        xPositions[i] = i * 20; // Store the original x position
    }

    // Matrix green colors
    const colors = [
        'rgba(0, 255, 70, 1)', // bright green (head)
        'rgba(0, 255, 70, 0.9)',
        'rgba(0, 255, 70, 0.8)',
        'rgba(0, 255, 70, 0.7)',
        'rgba(0, 255, 70, 0.6)',
        'rgba(0, 255, 70, 0.5)',
        'rgba(0, 255, 70, 0.4)',
        'rgba(0, 255, 70, 0.3)',
        'rgba(0, 255, 70, 0.2)',
        'rgba(0, 255, 70, 0.1)' // faint green (tail)
    ];

    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function draw() {
        // Set background with slight transparency for the trail effect
        ctx.fillStyle = 'rgba(0, 8, 2, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set font style
        ctx.font = '15px Consolas';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Calculate original position
            const originalX = i * 20;
            const originalY = drops[i] * 20;
            
            // Calculate distance from mouse
            const dx = originalX - mouseX;
            const dy = originalY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate displacement based on distance
            let displacementX = 0;
            let displacementY = 0;
            
            if (distance < mouseRadius) {
                // Characters within the mouse radius get pushed away
                const force = (1 - distance / mouseRadius) * maxDisplacement;
                displacementX = (dx / distance) * force * 3; // Stronger horizontal effect
                displacementY = (dy / distance) * force;
                
                // Add some randomness for scattering effect
                if (Math.random() > 0.7) {
                    displacementX += (Math.random() - 0.5) * 3;
                    displacementY += (Math.random() - 0.5) * 3;
                }
            }
            
            // Apply displacement
            const displayX = originalX + displacementX;
            const displayY = originalY + displacementY;
            
            // Random character to print
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            
            // Draw head character (brightest)
            ctx.fillStyle = colors[0];
            ctx.fillText(text, displayX, displayY);
            
            // Draw falling characters with gradient effect
            for (let j = 1; j < colors.length; j++) {
                ctx.fillStyle = colors[j];
                const prevChar = chars.charAt(Math.floor(Math.random() * chars.length));
                
                // Apply similar displacement to the tail characters
                const tailDisplacementX = displacementX * (1 - j/colors.length);
                const tailDisplacementY = displacementY * (1 - j/colors.length);
                const tailX = originalX + tailDisplacementX;
                const tailY = (drops[i] - j) * 20 + tailDisplacementY;
                
                ctx.fillText(prevChar, tailX, tailY);
            }
            
            // Move drops down
            drops[i]++;
            
            // Randomly reset some drops to top
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }

    // Update the matrix animation
    setInterval(draw, 50);

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns
        const newColumns = Math.floor(canvas.width / 20);
        
        // Add or remove drops as needed
        if (newColumns > columns) {
            // Add more drops if window got wider
            for (let i = columns; i < newColumns; i++) {
                drops.push(Math.floor(Math.random() * canvas.height));
                xPositions.push(i * 20);
            }
        } else if (newColumns < columns) {
            // Remove excess drops if window got narrower
            drops.splice(newColumns);
            xPositions.splice(newColumns);
        }
    });

    // Add interactivity - typing effect for "About Me" terminal
    const typingTexts = document.querySelectorAll('.typing');
    typingTexts.forEach(text => {
        const textContent = text.textContent;
        text.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < textContent.length) {
                text.textContent += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 1000 + Math.random() * 1000);
    });

    // Add cursor blink animation for terminal
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Form submission handling (prevent page reload)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const messageSent = document.getElementById('messageSent');
        if (messageSent) {
            messageSent.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageSent.style.display = 'none';
            }, 5000);
        }
        
        this.reset();
    });
} 
=======
// Matrix Rain Effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to display in the matrix rain
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const nums = '0123456789';
    const binary = '01';
    
    // Combine all character sets
    const chars = katakana + latin + nums + binary;

    // Matrix columns (1 per 20px of width)
    const columns = Math.floor(canvas.width / 20);
    // Array to track the y position of each column
    const drops = [];
    // Array to track the x position of each column (for mouse interaction)
    const xPositions = [];
    
    // Mouse position tracking
    let mouseX = -100;
    let mouseY = -100;
    const mouseRadius = 100; // Radius of effect around mouse
    const maxDisplacement = 5; // Maximum distance characters can be pushed

    // Initialize all drops to start at random positions
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
        xPositions[i] = i * 20; // Store the original x position
    }

    // Matrix green colors
    const colors = [
        'rgba(0, 255, 70, 1)', // bright green (head)
        'rgba(0, 255, 70, 0.9)',
        'rgba(0, 255, 70, 0.8)',
        'rgba(0, 255, 70, 0.7)',
        'rgba(0, 255, 70, 0.6)',
        'rgba(0, 255, 70, 0.5)',
        'rgba(0, 255, 70, 0.4)',
        'rgba(0, 255, 70, 0.3)',
        'rgba(0, 255, 70, 0.2)',
        'rgba(0, 255, 70, 0.1)' // faint green (tail)
    ];

    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function draw() {
        // Set background with slight transparency for the trail effect
        ctx.fillStyle = 'rgba(0, 8, 2, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set font style
        ctx.font = '15px Consolas';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Calculate original position
            const originalX = i * 20;
            const originalY = drops[i] * 20;
            
            // Calculate distance from mouse
            const dx = originalX - mouseX;
            const dy = originalY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate displacement based on distance
            let displacementX = 0;
            let displacementY = 0;
            
            if (distance < mouseRadius) {
                // Characters within the mouse radius get pushed away
                const force = (1 - distance / mouseRadius) * maxDisplacement;
                displacementX = (dx / distance) * force * 3; // Stronger horizontal effect
                displacementY = (dy / distance) * force;
                
                // Add some randomness for scattering effect
                if (Math.random() > 0.7) {
                    displacementX += (Math.random() - 0.5) * 3;
                    displacementY += (Math.random() - 0.5) * 3;
                }
            }
            
            // Apply displacement
            const displayX = originalX + displacementX;
            const displayY = originalY + displacementY;
            
            // Random character to print
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            
            // Draw head character (brightest)
            ctx.fillStyle = colors[0];
            ctx.fillText(text, displayX, displayY);
            
            // Draw falling characters with gradient effect
            for (let j = 1; j < colors.length; j++) {
                ctx.fillStyle = colors[j];
                const prevChar = chars.charAt(Math.floor(Math.random() * chars.length));
                
                // Apply similar displacement to the tail characters
                const tailDisplacementX = displacementX * (1 - j/colors.length);
                const tailDisplacementY = displacementY * (1 - j/colors.length);
                const tailX = originalX + tailDisplacementX;
                const tailY = (drops[i] - j) * 20 + tailDisplacementY;
                
                ctx.fillText(prevChar, tailX, tailY);
            }
            
            // Move drops down
            drops[i]++;
            
            // Randomly reset some drops to top
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }

    // Update the matrix animation
    setInterval(draw, 50);

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns
        const newColumns = Math.floor(canvas.width / 20);
        
        // Add or remove drops as needed
        if (newColumns > columns) {
            // Add more drops if window got wider
            for (let i = columns; i < newColumns; i++) {
                drops.push(Math.floor(Math.random() * canvas.height));
                xPositions.push(i * 20);
            }
        } else if (newColumns < columns) {
            // Remove excess drops if window got narrower
            drops.splice(newColumns);
            xPositions.splice(newColumns);
        }
    });

    // Add interactivity - typing effect for "About Me" terminal
    const typingTexts = document.querySelectorAll('.typing');
    typingTexts.forEach(text => {
        const textContent = text.textContent;
        text.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < textContent.length) {
                text.textContent += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 1000 + Math.random() * 1000);
    });

    // Add cursor blink animation for terminal
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Form submission handling (prevent page reload)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const messageSent = document.getElementById('messageSent');
        if (messageSent) {
            messageSent.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageSent.style.display = 'none';
            }, 5000);
        }
        
        this.reset();
    });
} 
>>>>>>> d950db16e52c9307ff1028d52cc493241d316c75
