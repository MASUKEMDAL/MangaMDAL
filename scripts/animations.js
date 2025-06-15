// Advanced Animations and Effects
class AnimationController {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        // Fade in animation observer
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Slide up animation observer
        const slideUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Apply animations to elements
        document.querySelectorAll('.chapter-card, .character-card, .glossary-card').forEach(el => {
            el.classList.add('fade-in-element');
            fadeInObserver.observe(el);
        });

        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('slide-up-element');
            slideUpObserver.observe(el);
        });

        this.observers.push(fadeInObserver, slideUpObserver);
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const handleParallax = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledParallax = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledParallax);
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.chapter-card, .character-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });

        // Magnetic effect for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    createRippleEffect(event) {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupLoadingAnimations() {
        // Stagger animation for elements
        const staggerElements = document.querySelectorAll('.chapters-grid .chapter-card');
        staggerElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });

        // Text typing effect for hero title
        this.setupTypingEffect();
    }

    setupTypingEffect() {
        const titleElement = document.querySelector('.title-main');
        if (!titleElement) return;

        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.opacity = '1';

        let index = 0;
        const typeSpeed = 100;

        const typeWriter = () => {
            if (index < text.length) {
                titleElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        };

        // Start typing effect after loading screen
        setTimeout(() => {
            if (!document.getElementById('loading-screen')?.classList.contains('hidden')) {
                setTimeout(typeWriter, 2500);
            } else {
                typeWriter();
            }
        }, 100);
    }

    // Particle system for enhanced visual effects
    createParticleSystem(container, options = {}) {
        const defaults = {
            particleCount: 50,
            particleSize: 2,
            particleColor: 'rgba(255, 255, 255, 0.3)',
            animationDuration: 10,
            direction: 'up'
        };

        const config = { ...defaults, ...options };
        
        for (let i = 0; i < config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * config.particleSize + 1;
            const startX = Math.random() * 100;
            const startY = config.direction === 'up' ? 100 : 0;
            const duration = config.animationDuration + Math.random() * 5;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${config.particleColor};
                border-radius: 50%;
                left: ${startX}%;
                top: ${startY}%;
                animation: floatParticle ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;

            container.appendChild(particle);
        }
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// CSS Animations (injected via JavaScript)
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes floatParticle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }

    .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .fade-in-element.animate-fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-up-element {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }

    .slide-up-element.animate-slide-up {
        opacity: 1;
        transform: translateY(0);
    }

    /* Enhanced hover states */
    .chapter-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .chapter-card:hover {
        transform: translateY(-12px) scale(1.02);
    }

    .character-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .character-card:hover {
        transform: translateY(-8px);
    }

    /* Button animations */
    .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn:active {
        transform: scale(0.95);
    }

    /* Loading animations */
    .chapters-grid .chapter-card {
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(30px);
    }

    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Fullscreen reader animations */
    .chapter-reader.fullscreen {
        animation: expandFullscreen 0.3s ease-out;
    }

    @keyframes expandFullscreen {
        from {
            transform: scale(0.9);
            opacity: 0.8;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Smooth page transitions */
    .reader-page {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .reader-page[style*="display: block"] {
        opacity: 1;
    }

    /* Enhanced scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--secondary-black);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, var(--accent-red), var(--accent-purple));
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #ef4444, #8b5cf6);
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize animation controller
const animationController = new AnimationController();

// Enhanced particle system for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroParticles = document.querySelector('.floating-particles');
    if (heroParticles) {
        animationController.createParticleSystem(heroParticles, {
            particleCount: 30,
            particleSize: 3,
            particleColor: 'rgba(220, 38, 38, 0.4)',
            animationDuration: 15,
            direction: 'up'
        });
    }
});

// Export for global access
window.animationController = animationController;