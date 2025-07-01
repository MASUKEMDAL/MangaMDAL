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
                    "public/images/capitulo1/15.jpg"
                ]
            },
            2: {
                title: "Capítulo 2 - Masuke VS Drakom",
                pages: [
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%2010.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/paggina%201.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%202.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%203.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/pagian%204.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%205.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%206.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%207.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%208.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%209.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%2011.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%2012.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%2013.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%2014.jpg",
                    "https://raw.githubusercontent.com/MASUKEMDAL/MDAL-Capitulo-1/refs/heads/main/Pagina%2015.jpg"
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
        
        // Load current page and preload next/previous
        const pagesToLoad = [
            this.currentPage - 1,
            this.currentPage,
            this.currentPage + 1
        ].filter(index => index >= 0 && index < this.totalPages);
        
        pagesToLoad.forEach((pageIndex, i) => {
            const img = document.createElement('img');
            img.src = this.pages[pageIndex];
            img.alt = `Pagina ${pageIndex + 1}`;
            img.className = 'reader-page';
            img.loading = i === 1 ? 'eager' : 'lazy'; // Eager load current page
            
            // Show only current page
            if (pageIndex === this.currentPage) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
            
            // Add loading state
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.alt = 'Erro ao carregar imagem';
                img.style.background = 'var(--tertiary-black)';
                img.style.color = 'var(--medium-gray)';
                img.style.display = 'flex';
                img.style.alignItems = 'center';
                img.style.justifyContent = 'center';
                img.style.minHeight = '400px';
            });
            
            pagesContainer.appendChild(img);
        });
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
        
        // Update page display
        const pages = document.querySelectorAll('.reader-page');
        pages.forEach((page, index) => {
            if (index === this.currentPage) {
                page.style.display = 'block';
                page.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                page.style.display = 'none';
            }
        });
        
        // Preload adjacent pages
        this.preloadAdjacentPages();
        
        // Update navigation buttons
        this.updateNavigation();
    }
    
    preloadAdjacentPages() {
        const pagesToPreload = [
            this.currentPage - 1,
            this.currentPage + 1
        ].filter(index => index >= 0 && index < this.totalPages);
        
        pagesToPreload.forEach(pageIndex => {
            const existingImg = document.querySelector(`img[src="${this.pages[pageIndex]}"]`);
            if (!existingImg) {
                const img = new Image();
                img.src = this.pages[pageIndex];
            }
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