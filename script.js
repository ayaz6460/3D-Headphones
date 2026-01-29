gsap.registerPlugin(ScrollTrigger);

const headphoneCanvas = document.getElementById('headphone-canvas');
const speakerCanvas = document.getElementById('speaker-canvas');
const headphoneContext = headphoneCanvas.getContext('2d');
const speakerContext = speakerCanvas.getContext('2d');

// Configuration
const config = {
    headphone: {
        folder: 'headphones',
        count: 200, // Based on file count
        prefix: 'ezgif-frame-',
        ext: 'jpg',
        digits: 3
    },
    speaker: {
        folder: 'speaker',
        count: 124, // Based on file count
        prefix: 'ezgif-frame-',
        ext: 'jpg',
        digits: 3
    }
};

const images = {
    headphone: [],
    speaker: []
};

// Helper: Format numbers with leading zeros (e.g., 1 -> 001)
function formatIndex(index, digits) {
    return index.toString().padStart(digits, '0');
}

// Preload Images
function preloadImages() {
    let loadedCount = 0;
    const totalImages = config.headphone.count + config.speaker.count;

    function onImageLoad() {
        loadedCount++;
        const progress = Math.round((loadedCount / totalImages) * 100);
        document.querySelector('.loader').innerText = `Loading... ${progress}%`;
        
        if (loadedCount === totalImages) {
            initAnimations();
            gsap.to('.loading-overlay', { opacity: 0, duration: 0.5, onComplete: () => {
                document.querySelector('.loading-overlay').style.display = 'none';
            }});
        }
    }

    // Load Headphones
    for (let i = 1; i <= config.headphone.count; i++) {
        const img = new Image();
        img.src = `${config.headphone.folder}/${config.headphone.prefix}${formatIndex(i, config.headphone.digits)}.${config.headphone.ext}`;
        img.onload = onImageLoad;
        img.onerror = onImageLoad; // Continue even if error to avoid blocking
        images.headphone.push(img);
    }

    // Load Speakers
    for (let i = 1; i <= config.speaker.count; i++) {
         const img = new Image();
        img.src = `${config.speaker.folder}/${config.speaker.prefix}${formatIndex(i, config.speaker.digits)}.${config.speaker.ext}`;
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
        images.speaker.push(img);
    }
}

// Resize Canvas
function resizeCanvas(canvas, context, img) {
    if (!img) return;
    
    // Set canvas dimensions to window match, but keep aspect ratio rendering logic in render
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    render(canvas, context, img);
}

// Render Image to Canvas (Cover/Contain logic)
function render(canvas, context, img) {
    if (!img) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio); // Cover effect. Use Math.min for Contain.
    
    // For products, 'contain' might be better if we want to see the whole product, 
    // but 'cover' is more cinematic. Let's stick to a slightly smaller 'contain' or 'cover' depending on aesthetic.
    // The user asked for "large product image", "fullscreen".
    // Let's try 'contain' first to ensure the whole product is seen, but scale it up a bit if needed.
    // Actually, requested "fullscreen hero", "images change... like a video". Video usually fills.
    // But if aspect ratio differs, 'cover' crops. 
    // Let's use a "contain" approach that maximizes size without cropping, centered.
    
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.9; // 90% size to breathe
    
    const centerShift_x = (canvas.width - img.width * scale) / 2;
    const centerShift_y = (canvas.height - img.height * scale) / 2;
    
    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * scale, img.height * scale);
}


function initAnimations() {
    
    // --- Headphone Section ---
    const headphoneState = { frame: 0 };
    
    // Render first frame immediately
    resizeCanvas(headphoneCanvas, headphoneContext, images.headphone[0]);

    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=300%", // Scroll distance triggers animation duration
        pin: true,
        scrub: 0.5, // Smooth scrubbing
        onUpdate: (self) => {
            const frameIndex = Math.min(
                config.headphone.count - 1,
                Math.floor(self.progress * (config.headphone.count - 1))
            );
            render(headphoneCanvas, headphoneContext, images.headphone[frameIndex]);
        }
    });
    
    // Text animations for Hero
    const heroTextAnim = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=50%",
            scrub: true
        }
    });
    heroTextAnim.to("#hero .fade-in-up", { opacity: 1, y: 0, stagger: 0.2, duration: 1 });
    heroTextAnim.to("#hero .fade-in-up", { opacity: 0, y: -30, stagger: 0.1, duration: 1 }, "+=0.5"); // Fade out before section ends


    // --- Speaker Section ---
    const speakerState = { frame: 0 };
    
    // Render first frame
    resizeCanvas(speakerCanvas, speakerContext, images.speaker[0]);

    ScrollTrigger.create({
        trigger: "#speaker",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
            const frameIndex = Math.min(
                config.speaker.count - 1,
                Math.floor(self.progress * (config.speaker.count - 1))
            );
            render(speakerCanvas, speakerContext, images.speaker[frameIndex]);
        }
    });

    // Text animations for Speaker
    const speakerTextAnim = gsap.timeline({
        scrollTrigger: {
            trigger: "#speaker",
            start: "top bottom", // Starts when section hits bottom of viewport? No, pinned.
            // Since it's pinned, we need to correct the trigger.
            // Actually with pin, the start is usually "top top". 
            // We want text to fade in as we scroll INTO the sequence.
            trigger: "#speaker",
            start: "top top",
            end: "+=50%",
            scrub: true
        }
    });
    
    // Initial state set in CSS is opacity 0, y 30.
    speakerTextAnim.to("#speaker .fade-in-up", { opacity: 1, y: 0, stagger: 0.2, duration: 1 });
    // Keep it visible for a bit
    speakerTextAnim.to({}, { duration: 1 }); 
    
    // Window resize handling
    window.addEventListener('resize', () => {
        resizeCanvas(headphoneCanvas, headphoneContext, images.headphone[Math.round(ScrollTrigger.getById(null).progress * (config.headphone.count-1)) || 0]); // Rough re-render
        // Better: just trigger a scroll update or re-render current frame
        // For simplicity in this demo, we rely on the scroll event to correct it or just re-render frame 0 if idle
    });
}

// Start
preloadImages();
