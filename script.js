// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav .hidden');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}

// Button interactions
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('section:first-of-type');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Active link highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Scroll to CTA section when Translate Dream is clicked
const translateBtn = document.getElementById('translateBtn');

if (translateBtn) {
    translateBtn.addEventListener('click', function () {
        const ctaSection = document.getElementById('cta');

        if (ctaSection) {
            ctaSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Scroll to CTA section when Translate Dream is clicked
const translateBtni = document.getElementById('translateBtni');

if (translateBtni) {}
    translateBtni.addEventListener('click', function () {
        const ctaSection = document.getElementById('cta');

        if (ctaSection) {
            ctaSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    const toggleBtn = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu button").forEach(btn => {
        btn.addEventListener("click", () => {
          mobileMenu.classList.remove("active");
        });
      });

      async function sendDream() {
    const dreamInput = document.getElementById("Interpret");
    const loader = document.getElementById("loader");
    const resultContainer = document.getElementById("result-container");
    const resultElement = document.getElementById("result");
    const loaderEmoji = loader.querySelector('span');

    if (!dreamInput || !loader || !resultContainer || !resultElement) return;
    
    const dream = dreamInput.value;
    if (!dream.trim()) return;

    // Show loader, hide result
    loader.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    
    // Randomize loader emoji
    const emojis = ["🛸", "🧠", "✨", "🔮", "🌌", "🌙"];
    let emojiIndex = 0;
    const emojiInterval = setInterval(() => {
        loaderEmoji.innerText = emojis[emojiIndex];
        loaderEmoji.classList.toggle('spinning');
        emojiIndex = (emojiIndex + 1) % emojis.length;
    }, 500);

    try {
        const response = await fetch("https://lucid-lens.onrender.com/api/ai/response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: dream })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        clearInterval(emojiInterval);
        loader.classList.add("hidden");
        
        resultElement.innerText = data.response || "No interpretation received.";
        resultContainer.classList.remove("hidden");
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        console.error("Error sending dream:", error);
        clearInterval(emojiInterval);
        loader.classList.add("hidden");
        
        resultElement.innerText = "❌ Sorry, there was an error interpreting your dream. Please try again.";
        resultContainer.classList.remove("hidden");
    }
}