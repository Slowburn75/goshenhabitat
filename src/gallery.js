
/**
 * Simple Lightbox Gallery
 */

export function initGallery() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'fixed inset-0 z-[100] hidden bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 opacity-0';

    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transform scale-95 transition-transform duration-300';

    const lightboxVideo = document.createElement('video');
    lightboxVideo.className = 'max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transform scale-95 transition-transform duration-300 hidden';
    lightboxVideo.controls = true;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors focus:outline-none';
    closeBtn.ariaLabel = 'Close gallery';

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxVideo);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Open lightbox
    const openLightbox = (src, type) => {
        if (type === 'video') {
            lightboxImg.classList.add('hidden');
            lightboxVideo.classList.remove('hidden');
            lightboxVideo.src = src;
            lightboxVideo.play();
            setTimeout(() => lightboxVideo.classList.remove('scale-95'), 10);
        } else {
            lightboxVideo.classList.add('hidden');
            lightboxVideo.pause();
            lightboxImg.classList.remove('hidden');
            lightboxImg.src = src;
            setTimeout(() => lightboxImg.classList.remove('scale-95'), 10);
        }

        lightbox.classList.remove('hidden');
        // Trigger reflow
        void lightbox.offsetWidth;
        lightbox.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.add('scale-95');
        lightboxVideo.classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
            lightboxVideo.pause();
            lightboxVideo.src = '';
            document.body.style.overflow = '';
        }, 300);
    };

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
    });

    // Attach to images and videos
    const galleryItems = document.querySelectorAll('section.bg-gray-900 .grid img, section.bg-gray-900 .grid video');

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default video behavior if any
            const src = item.tagName === 'VIDEO' ? (item.currentSrc || item.src) : item.src;
            const type = item.tagName === 'VIDEO' ? 'video' : 'image';
            openLightbox(src, type);
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGallery);
