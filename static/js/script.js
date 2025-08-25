document.addEventListener('DOMContentLoaded', function () {

    /* ======================
       CARROSSEL DE IMAGENS
    ====================== */
    const carousel = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    updateCarousel();


    /* ======================
       BOTÃO VOLTAR AO TOPO
    ====================== */
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ======================
       MENU MOBILE
    ====================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Submenu cascata no mobile
        document.querySelectorAll('#main-menu > li.dropdown > a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    const parent = link.parentElement;
                    parent.classList.toggle('active');
                }
            });
        });
    }


    /* ======================
       FORMULÁRIO CONTATO
    ====================== */
    const form = document.querySelector('#contato form');
    const key = 'contatos';

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(form));
            const errors = [];

            if (!data.nome || data.nome.trim().length < 3) {
                errors.push('Informe um nome válido (mínimo 3 caracteres).');
            }
            if (!isValidEmail(data.email)) {
                errors.push('E-mail inválido.');
            }
            if (!data.mensagem || data.mensagem.trim().length < 10) {
                errors.push('Mensagem muito curta (mínimo 10 caracteres).');
            }

            if (errors.length) {
                alert(errors.join('\n'));
                return;
            }

            const items = JSON.parse(localStorage.getItem(key) || '[]');
            items.push({ ...data, dataEnvio: new Date().toISOString() });
            localStorage.setItem(key, JSON.stringify(items));

            form.reset();
            alert('Mensagem enviada! Seus dados foram salvos no navegador.');
        });
    }
});

// ---- Tabs dos formulários ----
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    const iframe = document.getElementById("simulado-iframe"); // Adicione o id ao seu iframe no HTML

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");
            // Remove active de todos
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            // Ativa o botão e conteúdo correspondente
            button.classList.add("active");
            document.getElementById(tabId).classList.add("active");

            // Troca o src do iframe conforme o tab
            if (iframe) {
                const simuladoSrc = button.getAttribute("data-src"); // Adicione data-src nos botões das tabs
                if (simuladoSrc) {
                    iframe.src = simuladoSrc;
                }
            }
        });
    });

    // ---- Checklist com localStorage ----
    document.querySelectorAll(".checklist input[type='checkbox']").forEach(box => {
        const id = box.id;
        box.checked = localStorage.getItem(id) === "true";

        box.addEventListener("change", () => {
            localStorage.setItem(id, box.checked);
        });
    });
});

