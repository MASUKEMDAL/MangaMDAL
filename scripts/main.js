// Main JavaScript functionality
class MDALSite {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleLoading();
        this.setupNavigation();
        this.setupScrollEffects();
        this.createFloatingParticles();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.handleLoading();
        });

        // Window Load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
        });

        // Scroll Events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Resize Events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Navigation Toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });
    }

    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Simulate loading progress
            const progressBar = document.querySelector('.loading-progress');
            if (progressBar) {
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, 100);
            }
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            this.isLoading = false;
            
            // Enable scroll after loading
            document.body.style.overflow = 'auto';
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.navigateToSection(targetSection);
            });
        });

        // Update active nav on scroll
        this.updateActiveNavigation();
    }

    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-70px 0px -70px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;

        // Add scrolled class to navbar
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrollY < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
    }

    handleResize() {
        // Close mobile menu on resize
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 768) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    }

    createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;

        // Create additional floating particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 6}s;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }
    }
}

// PDF Download Functionality
function downloadPDF(chapterNumber) {
    let fileName = '';
    let downloadName = '';
    
    switch(chapterNumber) {
        case 1:
            fileName = 'public/novels/Capítulo 1 - O Principe das Trevas.docx';
            downloadName = 'MDAL - Capítulo 1 - O Príncipe das Trevas.docx';
            break;
        case 2:
            fileName = 'public/novels/Capítulo 2 - Masuke VS Drakom.docx';
            downloadName = 'MDAL - Capítulo 2 - Masuke VS Drakom.docx';
            break;
        case 3:
            fileName = 'public/novels/Capítulo 3 - Invasão em PHENIX.docx';
            downloadName = 'MDAL - Capítulo 3 - Invasão em PHENIX.docx';
            break;
        case 4:
            fileName = 'public/novels/Capítulo 4 - O Confronto com a Demons.docx';
            downloadName = 'MDAL - Capítulo 4 - O Confronto com a Demons.docx';
            break;
        case 5:
            fileName = 'public/novels/Capítulo 5 - O verdadeiro poder de Drakom.docx';
            downloadName = 'MDAL - Capítulo 5 - O Verdadeiro Poder de Drakom.docx';
            break;
        case 6:
            fileName = 'public/novels/Capítulo 6 - A Missão de Hiroshi.docx';
            downloadName = 'MDAL - Capítulo 6 - A Missão de Hiroshi.docx';
            break;
        case 7:
            fileName = 'public/novels/Capítulo 7 – Invasão na Sociedade dos Dragões.docx';
            downloadName = 'MDAL - Capítulo 7 - Invasão na Sociedade dos Dragões.docx';
            break;
        default:
            console.error('Capítulo não encontrado');
            return;
    }
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileName;
    link.download = downloadName;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download notification
    showDownloadNotification();
}

// Show download notification
function showDownloadNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-download"></i>
            <span>Download iniciado!</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-accent);
        color: var(--pure-white);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Glossary Tab Switching
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked tab and corresponding content
    document.querySelector(`[onclick="switchTab('${tabName}')"]`)?.classList.add('active');
    document.getElementById(tabName)?.classList.add('active');
}

// Scroll to Section Helper
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize the site
const mdalSite = new MDALSite();

// Export functions for global access
window.downloadPDF = downloadPDF;
window.switchTab = switchTab;
window.scrollToSection = scrollToSection;