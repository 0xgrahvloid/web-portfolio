lucide.createIcons();

    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      menuBtn.innerHTML = `<i data-lucide="${isOpen ? 'menu' : 'x'}" class="h-5 w-5"></i>`;
      lucide.createIcons();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<i data-lucide="menu" class="h-5 w-5"></i>';
        lucide.createIcons();
      });
    });

    const closeMobileMenu = () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '<i data-lucide="menu" class="h-5 w-5"></i>';
      lucide.createIcons();
    };

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeMobileMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
        menuBtn.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        closeMobileMenu();
      }
    });

    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el, index) => {
      if (!el.classList.contains('show')) el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(el);
    });

    document.querySelectorAll('.spotlight').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });

    const sections = [...document.querySelectorAll('main section[id]')];
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    sections.forEach(section => navObserver.observe(section));

    // Hero creative-focus rotator: subtle motion that remains readable for recruiters.
    const heroFocusText = document.getElementById('heroFocusText');
    const heroFocusItems = ['Graphic Design', 'Video Editing', 'UI/UX Design', 'AI-Assisted Creative'];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let heroFocusIndex = 0;

    if (heroFocusText && !reduceMotion) {
      setInterval(() => {
        heroFocusText.classList.add('is-changing');
        setTimeout(() => {
          heroFocusIndex = (heroFocusIndex + 1) % heroFocusItems.length;
          heroFocusText.textContent = heroFocusItems[heroFocusIndex];
          requestAnimationFrame(() => heroFocusText.classList.remove('is-changing'));
        }, 220);
      }, 2400);
    }

    // CV lives as a separate PDF file for cleaner deployment and easier updates.
    const cvFilePath = "cv/Anugrah-Pratama-CV-2026.pdf";
    const cvFileName = "Anugrah-Pratama-CV-2026.pdf";

    const cvModal = document.getElementById('cvModal');
    const cvPreviewArea = document.getElementById('cvPreviewArea');
    const closeCvModalBtn = document.getElementById('closeCvModal');
    let lastCvTrigger = null;

    function viewEmbeddedCV(event) {
      lastCvTrigger = event?.currentTarget || document.activeElement;
      if (cvPreviewArea) cvPreviewArea.scrollTop = 0;
      cvModal?.classList.remove('hidden');
      cvModal?.classList.add('flex');
      cvModal?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeCvModalBtn?.focus();
    }

    function closeEmbeddedCV() {
      if (!cvModal || cvModal.classList.contains('hidden')) return;
      cvModal.classList.add('hidden');
      cvModal.classList.remove('flex');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastCvTrigger && typeof lastCvTrigger.focus === 'function') lastCvTrigger.focus();
    }

    function downloadEmbeddedCV() {
      const link = document.createElement('a');
      link.href = cvFilePath;
      link.download = cvFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    document.querySelectorAll('[data-view-cv]').forEach(button => {
      button.addEventListener('click', viewEmbeddedCV);
    });

    document.querySelectorAll('[data-download-cv]').forEach(button => {
      button.addEventListener('click', downloadEmbeddedCV);
    });

    closeCvModalBtn?.addEventListener('click', closeEmbeddedCV);
    cvModal?.addEventListener('click', (event) => {
      if (event.target === cvModal) closeEmbeddedCV();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeEmbeddedCV();
    });

    // Interactive skills: click/tap animation + small status feedback.
    const skillButtons = document.querySelectorAll('.skill-chip');
    const skillToast = document.getElementById('skillToast');
    const skillToastText = document.getElementById('skillToastText');
    let skillToastTimer;

    skillButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        skillButtons.forEach((item) => item !== button && item.classList.remove('is-clicked'));

        button.classList.remove('is-clicked');
        void button.offsetWidth;
        button.classList.add('is-clicked');

        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'skill-ripple';
        ripple.style.left = `${event.clientX ? event.clientX - rect.left : rect.width / 2}px`;
        ripple.style.top = `${event.clientY ? event.clientY - rect.top : rect.height / 2}px`;
        button.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });

        if (skillToast && skillToastText) {
          skillToastText.textContent = `${button.dataset.skill} selected`;
          skillToast.classList.add('show');
          clearTimeout(skillToastTimer);
          skillToastTimer = setTimeout(() => skillToast.classList.remove('show'), 1600);
        }

        setTimeout(() => button.classList.remove('is-clicked'), 760);
      });
    });


    document.getElementById('year').textContent = new Date().getFullYear();
