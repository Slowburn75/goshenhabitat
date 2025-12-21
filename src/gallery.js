
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

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors focus:outline-none';
    closeBtn.ariaLabel = 'Close gallery';

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Open lightbox
    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.remove('hidden');
        // Trigger reflow
        void lightbox.offsetWidth;
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
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

    // Attach to images
    // We look for images inside .group inside #gallery or sections with specific class
    // For now, let's target images in the gallery grid
    const galleryImages = document.querySelectorAll('section.bg-gray-900 .grid img');

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGallery);
