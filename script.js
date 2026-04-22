document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const headerLinks = document.querySelectorAll('.nav-links a');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submitBtn');
    const sections = document.querySelectorAll('section');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll spy functionality
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        // Special case: if scrolled to the very bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            current = sections[sections.length - 1].getAttribute('id');
        }

        headerLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Close menu when a link is clicked
    headerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Product Modal Data and Logic
    const productData = {
        'alba': {
            title: 'ALBA (5 Inch)',
            img: 'public/product-image.png',
            desc: `
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 15px;">The most prized, ultra-premium grade of Ceylon Cinnamon. Highly sought after for its exceptional sweetness, fragile bark, and visual perfection.</p>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: var(--text-main);">
                    <li style="margin-bottom: 8px;"><strong>Diameter:</strong> ~6mm</li>
                    <li style="margin-bottom: 8px;"><strong>Use Case:</strong> Luxury retail, gourmet culinary markets</li>
                </ul>
            `
        },
        'special': {
            title: 'Extra Special & Special',
            img: 'public/product-image.png',
            desc: `
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 15px;">Top-tier premium grades remaining highly delicate. Features exceptionally thin bark with a nuanced and aromatic sweetness.</p>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: var(--text-main);">
                    <li style="margin-bottom: 8px;"><strong>Diameter:</strong> 7mm - 9mm</li>
                    <li style="margin-bottom: 8px;"><strong>Use Case:</strong> Premium specialty stores, high-end packaging</li>
                </ul>
            `
        },
        'c-grades': {
            title: 'C-Grades: C5, C4',
            img: 'public/product-image.png',
            desc: `
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 15px;">Continental grades offering a perfect balance of excellent flavor profile and physical structural integrity for handling.</p>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: var(--text-main);">
                    <li style="margin-bottom: 8px;"><strong>C5:</strong> 10-12mm diameter (Standard premium)</li>
                    <li style="margin-bottom: 8px;"><strong>C4:</strong> 13-14mm diameter</li>
                    <li style="margin-bottom: 8px;"><strong>Use Case:</strong> Standard retail, commercial food service</li>
                </ul>
            `
        },
        'h-grades': {
            title: 'H-Grades: H1, H2',
            img: 'public/product-image.png',
            desc: `
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 15px;">Hamburg grades composed of heavier, thicker bark components. Delivers a highly robust flavor profile and darker color.</p>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: var(--text-main);">
                    <li style="margin-bottom: 8px;"><strong>H1:</strong> ~22mm diameter</li>
                    <li style="margin-bottom: 8px;"><strong>H2:</strong> ~25mm diameter</li>
                    <li style="margin-bottom: 8px;"><strong>Use Case:</strong> Bulk spice processing, heavy extraction</li>
                </ul>
            `
        },
        'industrial': {
            title: 'Industrial & Lower Grades',
            img: 'public/product-image.png',
            desc: `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="background: #fafafa; padding: 15px; border-radius: 5px; border: 1px solid #f0f0f0;">
                        <h4 style="margin: 0 0 8px 0; font-size: 0.95rem;">OFFCUT - C4/H2</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5;">Clean, dust-free machine-cut pieces (TBC) scaled from premium grades. Excellent for tea bags, brewing, and RTD beverage manufacturing.</p>
                    </div>
                    <div style="background: #fafafa; padding: 15px; border-radius: 5px; border: 1px solid #f0f0f0;">
                        <h4 style="margin: 0 0 8px 0; font-size: 0.95rem;">QUILLING SUPPER & QUILLING</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5;">High-quality broken sticks and inner bark. Holds the same signature aroma at a lower cost. Ideal for commercial grinding and wholesale bakeries.</p>
                    </div>
                    <div style="background: #fafafa; padding: 15px; border-radius: 5px; border: 1px solid #f0f0f0;">
                        <h4 style="margin: 0 0 8px 0; font-size: 0.95rem;">CHIPS</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5;">Unpeelable bark and robust outer pieces containing potent volatile oils. The standard foundational raw material for essential oil distillation.</p>
                    </div>
                </div>
            `
        }
    };

    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    if (modal && closeModal) {
        // Now adding click to the whole .product-visual-card
        document.querySelectorAll('.product-visual-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.getAttribute('data-id');
                const data = productData[productId];
                if (data) {
                    modalImg.src = data.img;
                    modalImg.alt = data.title;
                    modalTitle.textContent = data.title;
                    modalDesc.innerHTML = data.desc;
                    modal.classList.add('active');
                }
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            // Handle clicking the modal contact link
            if (e.target.closest('.modal-contact-link')) {
                // If we are on site.html where the contact form is
                if (document.getElementById('contactForm')) {
                    e.preventDefault();
                    modal.classList.remove('active');
                    const targetEle = document.getElementById('contact');
                    if (targetEle) {
                        targetEle.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                            const firstInput = document.querySelector('#contactForm input');
                            if (firstInput) firstInput.focus();
                        }, 500);
                    }
                }
            }
        });
    }

    // Auto focus contact form when navigated via hash
    if (window.location.hash === '#contact') {
        setTimeout(() => {
            const firstInput = document.querySelector('#contactForm input');
            if (firstInput) firstInput.focus();
        }, 800);
    }

    // Special handler to set 'Home' active on initial load if at the top
    if (window.scrollY < 100) {
        let homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            formFeedback.style.display = 'none';

            const formData = new FormData(contactForm);

            try {
                // We use the action URL defined safely in the HTML
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                const result = await response.json();

                if (response.ok) {
                    formFeedback.textContent = 'Thank you! Your quote request has been sent successfully.';
                    formFeedback.style.backgroundColor = '#d4edda';
                    formFeedback.style.color = '#155724';
                    formFeedback.style.border = '1px solid #c3e6cb';
                    formFeedback.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Failed to send message.');
                }
            } catch (error) {
                console.error(error);
                formFeedback.textContent = 'There was a problem sending your message. Please check the server configuration and try again.';
                formFeedback.style.backgroundColor = '#f8d7da';
                formFeedback.style.color = '#721c24';
                formFeedback.style.border = '1px solid #f5c6cb';
                formFeedback.style.display = 'block';
            } finally {
                submitBtn.textContent = 'Get Your Custom Quote';
                submitBtn.disabled = false;
            }
        });
    }
});
