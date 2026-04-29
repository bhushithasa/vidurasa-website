document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu on link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // Scroll spy for active link
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Adjust offset to account for fixed header
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
        
        // Handle case where we are at the top of the page for "home"
        if (scrollY < 100) {
            navItems.forEach(item => {
                item.classList.remove("active");
                if (item.getAttribute("href") === `#home` || item.getAttribute("href") === `/`) {
                    item.classList.add("active");
                }
            });
        }
    });

    // Handle form submission functionality for other needs if required in the future
    // Formspree is used directly via HTML form action.

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookieConsentBanner');
    const acceptBtn = document.getElementById('acceptCookies');

    if (cookieBanner) {
        const consent = localStorage.getItem('cookieConsent');
        
        if (!consent) {
            cookieBanner.classList.remove('hidden');
            // Small delay to allow CSS transition to apply
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 100);

            // Soft Opt-in Tracker: If they scroll, consider it consent
            const handleScrollConsent = () => {
                if (!localStorage.getItem('cookieConsent')) {
                    handleConsent('accepted');
                    window.removeEventListener('scroll', handleScrollConsent);
                }
            };
            // Add a small delay so initial page loads don't accidentally trigger scroll events right away
            setTimeout(() => {
                window.addEventListener('scroll', handleScrollConsent, { passive: true, once: true });
            }, 1000);
        }

        const handleConsent = (status) => {
            localStorage.setItem('cookieConsent', status);
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.classList.add('hidden');
            }, 300); // Wait for transition

            if (status === 'accepted' && typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        };

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => handleConsent('accepted'));
        }
    }

    // Scrollytelling functionality for Desktop
    const scrollSteps = document.querySelectorAll('.scroll-trigger');
    const visualTrack = document.getElementById('visualTrack');

    // Sticky Main Title Compact State
    const stickyMainTitle = document.querySelector('.sticky-main-title');
    const scrollyContainer = document.querySelector('.scrolly-text');
    
    if (stickyMainTitle && scrollyContainer) {
        window.addEventListener('scroll', () => {
            const transformVal = stickyMainTitle.style.transform;
            const currentY = parseFloat(transformVal.replace('translateY(', '').replace('px)', '')) || 0;
            const rect = stickyMainTitle.getBoundingClientRect();
            const naturalTop = rect.top - currentY;
            
            if (naturalTop <= 82) {
                stickyMainTitle.classList.add('compact');
                
                const containerRect = scrollyContainer.getBoundingClientRect();
                const stickyBottom = 80 + stickyMainTitle.offsetHeight;
                
                // Track the bottom of the scrolly white box
                if (containerRect.bottom < stickyBottom) {
                     const overlap = stickyBottom - containerRect.bottom;
                     stickyMainTitle.style.transform = `translateY(-${overlap}px)`;
                } else {
                     stickyMainTitle.style.transform = `translateY(0px)`;
                }
            } else {
                stickyMainTitle.classList.remove('compact');
                stickyMainTitle.style.transform = `translateY(0px)`;
            }
        });
    }

    if (scrollSteps.length > 0 && visualTrack && window.innerWidth > 768) {
        // We only apply this complex logic on larger screens where the layout is side-by-side
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepIndex = parseInt(entry.target.getAttribute('data-step'), 10);
                    
                    // Slide the visual track
                    visualTrack.style.transform = `translateX(-${stepIndex * 25}%)`;
                }
            });
        }, observerOptions);

        scrollSteps.forEach(step => observer.observe(step));
    }

    // Sticky Products Header Logic
    const productsHeader = document.querySelector('.sticky-products-header');
    const productGrid = document.querySelector('.product-grid');
    
    if (productsHeader && productGrid) {
        window.addEventListener('scroll', () => {
            const transformVal = productsHeader.style.transform;
            const currentY = parseFloat(transformVal.replace('translateY(', '').replace('px)', '')) || 0;
            const rect = productsHeader.getBoundingClientRect();
            const naturalTop = rect.top - currentY;
            
            if (naturalTop <= 82) {
                productsHeader.classList.add('compact');
                if (window.innerWidth > 768) {
                    const gridRect = productGrid.getBoundingClientRect();
                    const stickyBottom = 80 + productsHeader.offsetHeight;
                    
                    // Track the bottom of the product grid (the white boxes)
                    if (gridRect.bottom < stickyBottom) {
                         const overlap = stickyBottom - gridRect.bottom;
                         productsHeader.style.transform = `translateY(-${overlap}px)`;
                    } else {
                         productsHeader.style.transform = `translateY(0px)`;
                    }
                }
            } else {
                productsHeader.classList.remove('compact');
                productsHeader.style.transform = `translateY(0px)`;
            }
        });
    }

    // Sticky About Title Logic
    const aboutTitle = document.querySelector('h2.sticky-about-title');
    const aboutGrid = document.querySelector('.about-grid-new');
    
    if (aboutTitle && aboutGrid) {
        window.addEventListener('scroll', () => {
            const rect = aboutTitle.getBoundingClientRect();
            if (rect.top <= 82) {
                aboutTitle.classList.add('compact');
            } else {
                aboutTitle.classList.remove('compact');
            }
        });
    }

    // Modal Logic
    const modal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const productCards = document.querySelectorAll('.clickable-card');
    const prevBtn = document.querySelector('.prev-nav');
    const nextBtn = document.querySelector('.next-nav');
    const modalContent = document.querySelector('.modal-content');

    let currentProductIndex = 0;
    const productIds = ['alba', 'c5', 'c4', 'h', 'powder', 'quillings', 'cut-pieces', 'custom'];

    const productsData = {
        'alba': {
            title: 'Cinnamon Sticks (Alba)',
            image: '/images/alba.png',
            desc: 'Alba is the most prized and rarest grade of Ceylon Cinnamon. It is crafted with extremely thin quills, resulting in a sweet taste and powerful aroma. Widely used in delicate infusions and gourmet presentations where visual perfection and refined flavor are paramount.',
            specs: [
                ['Diameter', '6mm - 10mm'],
                ['Texture', 'Smooth, very thin quills'],
                ['Color', 'Golden brown'],
                ['Aroma', 'Sweet & Intense'],
                ['Grade', 'Premium Alba']
            ]
        },
        'c5': {
            title: 'Cinnamon Sticks (C5)',
            image: '/images/c5.png',
            desc: 'A high-end continental grade popular in the European market. It offers a refined flavor profile with excellent visual appeal. Perfect for boutique retail and premium culinary applications.',
            specs: [
                ['Diameter', '10mm - 12mm'],
                ['Texture', 'Solid, smooth quills'],
                ['Color', 'Light brown'],
                ['Usage', 'Gourmet cooking, Retail'],
                ['Grade', 'Continental 5']
            ]
        },
        'c4': {
            title: 'Cinnamon Sticks (C4)',
            image: '/images/c4.png',
            desc: 'The standard high-quality continental grade. It is versatile and widely used across retail and hospitality sectors for its consistent flavor and manageable size.',
            specs: [
                ['Diameter', '13mm - 16mm'],
                ['Texture', 'Firm quills'],
                ['Color', 'Rust brown'],
                ['Market', 'Worldwide distribution'],
                ['Grade', 'Continental 4']
            ]
        },
        'h': {
            title: 'Cinnamon Sticks (H)',
            image: '/images/h.png',
            desc: 'Hamburg grades are thicker and harder than Alba or C grades. They are excellent for industrial applications, distillation, and scenarios where a robust cinnamon presence is required.',
            specs: [
                ['Diameter', '20mm - 25mm'],
                ['Type', 'Hard quills'],
                ['Essential Oil', 'High content'],
                ['Ideal for', 'Industrial grinding, Oils'],
                ['Grade', 'Hamburg (H)']
            ]
        },
        'powder': {
            title: 'Cinnamon Powder',
            image: '/images/powder.png',
            desc: 'Our cinnamon powder is ground specifically from high-grade quills (not waste), ensuring the highest essential oil level and absolute purity. Free from any additives or fillers.',
            specs: [
                ['Purity', '100% Pure Ceylon'],
                ['Mesh Size', 'Fine (Standard)'],
                ['Additive', 'None'],
                ['Shelf Life', '24 Months'],
                ['Grade', 'Pure Powder']
            ]
        },
        'quillings': {
            title: 'Cinnamon Quillings',
            image: '/images/quillings.png',
            desc: 'Broken pieces of cinnamon quills obtained during the grading process. Perfect for tea blending, extraction, and pharmaceutical applications where quill structure is secondary to flavor extraction.',
            specs: [
                ['Quality', 'High Essential Oil'],
                ['Format', 'Small broken pieces'],
                ['Color', 'Dark brown to light'],
                ['Use Cases', 'Tea, Pharmaceutical'],
                ['Grade', 'Quillings']
            ]
        },
        'cut-pieces': {
            title: 'Cinnamon Cut Pieces',
            image: '/images/cut.png',
            desc: 'Precisely cut quills available in uniform lengths. These are pre-cut for specific retail jars, specialized food service needs, or premium spice racks.',
            specs: [
                ['Length', '1 inch to 5 inches'],
                ['Grade', 'Available in various'],
                ['Packaging', 'Bulk or Custom'],
                ['Convenience', 'Ready-to-use'],
                ['Grade', 'Cuts']
            ]
        },
        'custom': {
            title: 'Custom & Value-Added',
            image: '/images/product-image.png',
            desc: 'We provide specialized processing services including custom cutting, specialized cleaning, and private labeling for international distributors and large-scale retail chains.',
            specs: [
                ['Service', 'Private Labeling'],
                ['Cutting', 'Custom lengths'],
                ['Cleaning', 'Steam sterilized available'],
                ['Requests', 'MOQ applicable'],
                ['Support', 'Full Customization']
            ]
        }
    };

    const modalTrack = document.getElementById('modal-track');

    // Build cards
    if (modalTrack) {
        modalTrack.innerHTML = '';
        productIds.forEach((id) => {
            const data = productsData[id];
            
            let specsHtml = '';
            data.specs.forEach(spec => {
                specsHtml += `<li><strong>${spec[0]}</strong> <span>${spec[1]}</span></li>`;
            });
            
            const cardHtml = `
                <div class="modal-card" id="modal-card-${id}">
                    <div class="modal-body">
                        <div class="modal-grid">
                            <div class="modal-image-container">
                                <img src="${data.image}" alt="${data.title}">
                            </div>
                            <div class="modal-details">
                                <div class="modal-details-header">
                                    <h2>${data.title}</h2>
                                </div>
                                <div class="modal-details-scrollable">
                                    <div class="modal-desc">${data.desc}</div>
                                    <div class="modal-specs">
                                        <h4>Specifications</h4>
                                        <ul>
                                            ${specsHtml}
                                        </ul>
                                    </div>
                                </div>
                                <div class="modal-details-footer">
                                    <button type="button" class="btn btn-primary modal-quote-btn" style="display: block; text-align: center; width: 100%;">Request a Quote</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modalTrack.innerHTML += cardHtml;
        });
    }

    function goToSlide(index) {
        currentProductIndex = (index + productIds.length) % productIds.length;
        const track = document.getElementById('modal-track');
        const cards = document.querySelectorAll('.modal-card');
        
        if (cards.length > 0) {
            cards.forEach((card, i) => {
                if (i === currentProductIndex) {
                    card.classList.add('active-card');
                    // Reset scroll position of inner details
                    const scrollable = card.querySelector('.modal-details-scrollable');
                    if (scrollable) scrollable.scrollTop = 0;
                } else {
                    card.classList.remove('active-card');
                }
            });
            
            const targetCard = cards[currentProductIndex];
            const cardWidth = targetCard.offsetWidth;
            const centerPos = (window.innerWidth / 2) - (targetCard.offsetLeft + cardWidth / 2);
            track.style.transform = `translateX(${centerPos}px)`;
        }
    }

    window.addEventListener('resize', () => {
        if (modal.classList.contains('active')) {
            goToSlide(currentProductIndex);
        }
    });

    productCards.forEach((card) => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-product');
            const pIndex = productIds.indexOf(productId);
            
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');
            
            const track = document.getElementById('modal-track');
            if (track) track.style.transition = 'none';
            
            goToSlide(pIndex);
            
            if (track) {
                // Force reflow
                track.offsetHeight;
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Add listener for all quote buttons
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('modal-quote-btn')) {
            closeModal();
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        const firstInput = contactSection.querySelector('input, textarea');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    }, 800); // give enough time for scroll
                }
            }, 300); // allow modal animation to fade out
        }
    });

    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentProductIndex - 1);
    });

    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentProductIndex + 1);
    });

    // Navigation Shortcuts
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') goToSlide(currentProductIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentProductIndex + 1);
        if (e.key === 'Escape') closeModal();
    });

    // Swipe Support
    let touchStartX = 0;
    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    modal.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) goToSlide(currentProductIndex + 1);
            else goToSlide(currentProductIndex - 1);
        }
    }, {passive: true});

});
