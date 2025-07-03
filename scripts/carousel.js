// Character Carousel System
class CharacterCarousel {
    constructor() {
        this.carousels = new Map();
        this.init();
    }
    
    init() {
        // Initialize all carousels
        document.querySelectorAll('.character-carousel').forEach(carousel => {
            const characterName = carousel.dataset.character;
            const images = carousel.querySelectorAll('.carousel-image');
            const indicators = carousel.querySelectorAll('.indicator');
            
            this.carousels.set(characterName, {
                currentIndex: 0,
                totalImages: images.length,
                images: images,
                indicators: indicators
            });
        });
        
        this.setupAutoPlay();
    }
    
    changeImage(characterName, direction) {
        const carousel = this.carousels.get(characterName);
        if (!carousel) return;
        
        // Calculate new index
        let newIndex = carousel.currentIndex + direction;
        
        // Handle wrapping
        if (newIndex >= carousel.totalImages) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = carousel.totalImages - 1;
        }
        
        this.setImage(characterName, newIndex);
    }
    
    setImage(characterName, index) {
        const carousel = this.carousels.get(characterName);
        if (!carousel || index >= carousel.totalImages || index < 0) return;
        
        // Remove active class from all images and indicators
        carousel.images.forEach(img => img.classList.remove('active'));
        carousel.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current image and indicator
        carousel.images[index].classList.add('active');
        if (carousel.indicators[index]) {
            carousel.indicators[index].classList.add('active');
        }
        
        // Update current index
        carousel.currentIndex = index;
    }
    
    setupAutoPlay() {
        // Auto-advance carousel every 5 seconds for characters with multiple images
        setInterval(() => {
            this.carousels.forEach((carousel, characterName) => {
                if (carousel.totalImages > 1) {
                    this.changeImage(characterName, 1);
                }
            });
        }, 5000);
    }
}

// Initialize carousel system
const characterCarousel = new CharacterCarousel();

// Global functions for HTML onclick events
function changeCarouselImage(characterName, direction) {
    characterCarousel.changeImage(characterName, direction);
}

function setCarouselImage(characterName, index) {
    characterCarousel.setImage(characterName, index);
}

// Export functions
window.changeCarouselImage = changeCarouselImage;
window.setCarouselImage = setCarouselImage;