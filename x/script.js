/**
 * Pinterest Aesthetic Romantic Experience
 * Delicate, modern, and emotionally harmonious
 */

class PinterestRomantic {
    constructor() {
        this.isTransitioning = false;
        this.isMusicPlaying = false;
        this.audioContext = null;
        this.oscillator = null;
        this.gainNode = null;
        
        this.init();
    }

    /**
     * Initialize the romantic experience
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupInitialState();
    }

    /**
     * Cache DOM elements for optimal performance
     */
    cacheElements() {
        this.elements = {
            startButton: document.getElementById('start'),
            content: document.getElementById('content'),
            hero: document.getElementById('hero'),
            surpriseButton: document.getElementById('surprise'),
            musicButton: document.getElementById('music'),
            modal: document.getElementById('modal'),
            modalClose: document.getElementById('modalClose'),
            momentCards: document.querySelectorAll('.moment-card')
        };
    }

    /**
     * Bind all events with proper error handling
     */
    bindEvents() {
        try {
            // Main experience trigger
            this.elements.startButton?.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.isTransitioning) {
                    this.startExperience();
                }
            });

            // Surprise modal
            this.elements.surpriseButton?.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal();
            });

            // Music toggle
            this.elements.musicButton?.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMusic();
            });

            // Modal close
            this.elements.modalClose?.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal();
            });

            // Close modal on background click
            this.elements.modal?.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.hideModal();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideModal();
                }
            });

        } catch (error) {
            console.error('Error binding events:', error);
        }
    }

    /**
     * Set initial state
     */
    setupInitialState() {
        // Hide content initially
        if (this.elements.content) {
            this.elements.content.style.display = 'none';
        }
    }

    /**
     * Start the main experience with cinematic transition
     */
    startExperience() {
        if (this.isTransitioning) return;
        
        const { startButton, content, hero } = this.elements;
        
        if (!startButton || !content || !hero) {
            console.error('Required elements not found');
            return;
        }

        this.isTransitioning = true;

        // Disable button immediately
        startButton.disabled = true;
        startButton.style.opacity = '0.5';
        startButton.style.cursor = 'not-allowed';

        // Use requestAnimationFrame for smooth 60fps
        requestAnimationFrame(() => {
            this.executeCinematicTransition();
        });
    }

    /**
     * Execute cinematic transition sequence
     */
    executeCinematicTransition() {
        const { startButton, content, hero } = this.elements;

        try {
            // Phase 1: Cinematic fade out with scale
            hero.classList.add('fade-out');

            // Phase 2: Hide hero and prepare content
            setTimeout(() => {
                hero.style.display = 'none';
                startButton.style.display = 'none';
                content.style.display = 'block';
                
                // Force reflow for smooth animation
                content.offsetHeight;
                
                // Phase 3: Elegant content reveal
                requestAnimationFrame(() => {
                    content.classList.add('visible');
                    this.animateCards();
                });
            }, 600);

            // Phase 4: Re-enable interaction
            setTimeout(() => {
                this.isTransitioning = false;
            }, 1200);

        } catch (error) {
            console.error('Transition error:', error);
            this.fallbackTransition();
        }
    }

    /**
     * Fallback transition if main fails
     */
    fallbackTransition() {
        const { startButton, content, hero } = this.elements;
        
        hero.style.display = 'none';
        startButton.style.display = 'none';
        content.style.display = 'block';
        content.classList.add('visible');
        this.isTransitioning = false;
    }

    /**
     * Animate moment cards with elegant stagger
     */
    animateCards() {
        if (!this.elements.momentCards.length) return;

        this.elements.momentCards.forEach((card, index) => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    /**
     * Show modal with elegant animation
     */
    showModal() {
        const modal = this.elements.modal;
        if (!modal) return;

        modal.style.display = 'flex';
        // Force reflow
        modal.offsetHeight;
        
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        // Focus management for accessibility
        setTimeout(() => {
            this.elements.modalClose?.focus();
        }, 100);
    }

    /**
     * Hide modal with smooth animation
     */
    hideModal() {
        const modal = this.elements.modal;
        if (!modal) return;

        modal.classList.remove('active');

        setTimeout(() => {
            modal.style.display = 'none';
        }, 600);
    }
/**
 * Toggle background music (YouTube)
 */
toggleMusic() {
    const audio = document.getElementById("bgMusic");
    const buttonText = this.elements.musicButton.querySelector(".btn-text");

    if (audio.paused) {
        audio.currentTime = 136; // minuto 2:16
        audio.play();
        buttonText.textContent = "Pausar música";
    } else {
        audio.pause();
        buttonText.textContent = "Música";
    }
}



    /**
     * Start ambient music
     */
    startMusic() {
    try {

            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillator for gentle melody
            this.oscillator = this.audioContext.createOscillator();
            this.gainNode = this.audioContext.createGain();
            
            // Configure oscillator for soft sound
            this.oscillator.type = 'sine';
            this.oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
            
            // Connect nodes
            this.oscillator.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
            
            // Set very gentle volume
            this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            this.gainNode.gain.linearRampToValueAtTime(0.03, this.audioContext.currentTime + 0.5);
            
            // Start oscillator
            this.oscillator.start();
            
            // Create romantic melody
            this.createRomanticMelody();
            
            this.isMusicPlaying = true;
            
        } catch (error) {
            console.log('Audio not available:', error);
            this.showNotification('🎵 Música no disponible');
        }
    }

    /**
     * Create a gentle romantic melody
     */
    createRomanticMelody() {
        if (!this.oscillator || !this.audioContext) return;
        
        // Romantic scale with gentle progression
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66, 261.63];
        let noteIndex = 0;
        
        const playNote = () => {
            if (!this.isMusicPlaying) return;
            
            const frequency = notes[noteIndex % notes.length];
            this.oscillator.frequency.exponentialRampToValueAtTime(
                frequency, 
                this.audioContext.currentTime + 0.15
            );
            
            noteIndex++;
            setTimeout(playNote, 700);
        };
        
        playNote();
    }

    /**
     * Stop music gracefully
     */
    stopMusic() {
        if (this.oscillator && this.audioContext) {
            this.gainNode.gain.exponentialRampToValueAtTime(
                0.01, 
                this.audioContext.currentTime + 0.4
            );
            
            setTimeout(() => {
                this.oscillator.stop();
                this.oscillator = null;
                this.audioContext.close();
                this.audioContext = null;
            }, 400);
        }
        
        this.isMusicPlaying = false;
    }

    /**
     * Show elegant notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(253, 242, 248, 0.95);
            color: var(--text-primary);
            padding: 16px 32px;
            border-radius: 50px;
            box-shadow: 0 4px 16px rgba(251, 207, 232, 0.3);
            font-size: 14px;
            font-weight: 400;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // Fade in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 3500);
    }

    /**
     * Add subtle parallax effect to cards
     */
    setupParallax() {
        const cards = this.elements.momentCards;
        
        if (!cards.length) return;
        
        const handleMouseMove = (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            cards.forEach((card, index) => {
                const depth = (index + 1) * 0.5;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                
                card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            });
        };
        
        // Add parallax on mouse move (subtle effect)
        document.addEventListener('mousemove', handleMouseMove);
    }

    /**
     * Cleanup method for memory management
     */
    destroy() {
        // Stop music if playing
        if (this.isMusicPlaying) {
            this.stopMusic();
        }
        
        // Remove event listeners
        this.elements.startButton?.removeEventListener('click', this.startExperience);
        
        // Reset state
        this.isTransitioning = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.pinterestRomantic = new PinterestRomantic();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
});

// Handle page unload for cleanup
window.addEventListener('beforeunload', () => {
    if (window.pinterestRomantic) {
        window.pinterestRomantic.destroy();
    }
});
