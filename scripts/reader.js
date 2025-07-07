// Chapter Reader Functionality
class ChapterReader {
    constructor() {
        this.currentChapter = null;
        this.currentPage = 0;
        this.totalPages = 0;
        this.pages = [];
        this.isFullscreen = false;
        
        this.chapterData = {
            1: {
                title: "Capítulo 1 - O Renascimento de Masuke",
                pages: [
                    "public/images/capitulo1/1.jpg",
                    "public/images/capitulo1/2.jpg",
                    "public/images/capitulo1/3.jpg",
                    "public/images/capitulo1/4.jpg",
                    "public/images/capitulo1/5.jpg",
                    "public/images/capitulo1/6.jpg",
                    "public/images/capitulo1/7.jpg",
                    "public/images/capitulo1/8.jpg",
                    "public/images/capitulo1/9.jpg",
                    "public/images/capitulo1/10.jpg",
                    "public/images/capitulo1/11.jpg",
                    "public/images/capitulo1/12.jpg",
                    "public/images/capitulo1/13.jpg",
                    "public/images/capitulo1/14.jpg",
                    "public/images/capitulo1/15.jpg",
                    "public/images/capitulo1/extra 1.png",
                    "public/images/capitulo1/extra 2.png",
                    "public/images/capitulo1/extra3.png",
                    "public/images/capitulo1/extra 4.jpg",
                    "public/images/capitulo1/extra 5.jpg"
                ]
            },
            2: {
                title: "Capítulo 2 - Masuke VS Drakom",
                pages: [
                    "public/images/Capitulo2/1.jpg",
                    "public/images/Capitulo2/2.jpg",
                    "public/images/Capitulo2/3.jpg",
                    "public/images/Capitulo2/4.jpg",
                    "public/images/Capitulo2/5.jpg",
                    "public/images/Capitulo2/6.jpg",
                    "public/images/Capitulo2/7.jpg",
                    "public/images/Capitulo2/8.jpg",
                    "public/images/Capitulo2/9.jpg",
                    "public/images/Capitulo2/10.jpg",
                    "public/images/Capitulo2/11.jpg",
                    "public/images/Capitulo2/12.jpg",
                    "public/images/Drakom/Making Manga.png",
                    "public/images/Capitulo2/1000280244.png",
                    "public/images/Capitulo2/Masuke x Drakom.jpg"
                ]
            }
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.currentChapter) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousPage();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextPage();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.closeReader();
                        break;
                    case 'f':
                    case 'F':
                        if (e.ctrlKey || e.metaKey) {
                            e.preventDefault();
                            this.toggleFullscreen();
                        }
                        break;
                }
            }
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            if (this.currentChapter) {
                touchStartX = e.changedTouches[0].screenX;
            }
        });
        
        document.addEventListener('touchend', (e) => {
            if (this.currentChapter) {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next page
                    this.nextPage();
                } else {
                    // Swipe right - previous page
                    this.previousPage();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    openChapter(chapterNumber) {
        const chapterData = this.chapterData[chapterNumber];
        if (!chapterData) {
            console.error(`Chapter ${chapterNumber} not found`);
            return;
        }
        
        this.currentChapter = chapterNumber;
        this.pages = chapterData.pages;
        this.totalPages = this.pages.length;
        this.currentPage = 0;
        
        // Update reader UI
        const reader = document.getElementById('chapter-reader');
        const readerTitle = document.getElementById('reader-title');
        const readerProgress = document.getElementById('reader-progress');
        
        if (reader && readerTitle && readerProgress) {
            reader.classList.add('active');
            readerTitle.textContent = chapterData.title;
            readerProgress.textContent = `${this.currentPage + 1} / ${this.totalPages}`;
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            this.loadPages();
            this.updateNavigation();
        }
    }
    
    closeReader() {
        const reader = document.getElementById('chapter-reader');
        if (reader) {
            reader.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Exit fullscreen if active
            if (this.isFullscreen) {
                this.exitFullscreen();
            }
        }
        
        this.currentChapter = null;
        this.currentPage = 0;
        this.totalPages = 0;
        this.pages = [];
    }
    
    loadPages() {
        const pagesContainer = document.getElementById('reader-pages');
        if (!pagesContainer) return;
        
        pagesContainer.innerHTML = '';
        
        // Create image element for current page
        const img = document.createElement('img');
        img.src = this.pages[this.currentPage];
        img.alt = `Página ${this.currentPage + 1}`;
        img.className = 'reader-page';
        img.loading = 'eager';
        
        // Add loading state
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            console.error(`Failed to load image: ${img.src}`);
            img.alt = 'Erro ao carregar imagem';
            img.style.background = 'var(--tertiary-black)';
            img.style.color = 'var(--medium-gray)';
            img.style.display = 'flex';
            img.style.alignItems = 'center';
            img.style.justifyContent = 'center';
            img.style.minHeight = '400px';
            img.textContent = 'Erro ao carregar página';
        });
        
        pagesContainer.appendChild(img);
        
        // Preload adjacent pages
        this.preloadAdjacentPages();
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updateReader();
        }
    }
    
    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updateReader();
        }
    }
    
    updateReader() {
        // Update progress
        const readerProgress = document.getElementById('reader-progress');
        const currentPageSpan = document.getElementById('current-page');
        const totalPagesSpan = document.getElementById('total-pages');
        
        if (readerProgress) {
            readerProgress.textContent = `${this.currentPage + 1} / ${this.totalPages}`;
        }
        
        if (currentPageSpan) {
            currentPageSpan.textContent = this.currentPage + 1;
        }
        
        if (totalPagesSpan) {
            totalPagesSpan.textContent = this.totalPages;
        }
        
        // Load new page
        this.loadPages();
        
        // Update navigation buttons
        this.updateNavigation();
    }
    
    preloadAdjacentPages() {
        const pagesToPreload = [
            this.currentPage - 1,
            this.currentPage + 1
        ].filter(index => index >= 0 && index < this.totalPages);
        
        pagesToPreload.forEach(pageIndex => {
            const img = new Image();
            img.src = this.pages[pageIndex];
        });
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.totalPages - 1;
        }
    }
    
    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    enterFullscreen() {
        const reader = document.getElementById('chapter-reader');
        if (reader && reader.requestFullscreen) {
            reader.requestFullscreen().then(() => {
                this.isFullscreen = true;
                reader.classList.add('fullscreen');
            }).catch(err => {
                console.error('Error entering fullscreen:', err);
            });
        }
    }
    
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                this.isFullscreen = false;
                const reader = document.getElementById('chapter-reader');
                if (reader) {
                    reader.classList.remove('fullscreen');
                }
            }).catch(err => {
                console.error('Error exiting fullscreen:', err);
            });
        }
    }
}

// Initialize Chapter Reader
const chapterReader = new ChapterReader();

// Global functions for HTML onclick events
function openChapterReader(chapterNumber) {
    chapterReader.openChapter(chapterNumber);
}

function closeChapterReader() {
    chapterReader.closeReader();
}

function nextPage() {
    chapterReader.nextPage();
}

function previousPage() {
    chapterReader.previousPage();
}

function toggleFullscreen() {
    chapterReader.toggleFullscreen();
}

// Export functions
window.openChapterReader = openChapterReader;
window.closeChapterReader = closeChapterReader;
window.nextPage = nextPage;
window.previousPage = previousPage;
window.toggleFullscreen = toggleFullscreen;