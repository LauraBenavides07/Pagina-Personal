// Para cambiar de tema a oscuro a claro
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    console.log('Botón encontrado:', themeToggle);
    
    if (!themeToggle) {
        console.log('No se encontró el botón themeToggle');
        return;
    }
    
    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme');
    console.log('Tema guardado:', savedTheme);
    
    if (savedTheme === 'light') {
        root.classList.add('light-theme');
        console.log('Tema claro activado');
    }
    
    // Cambiar tema al hacer clic
    themeToggle.addEventListener('click', function() {
        root.classList.toggle('light-theme');
        
        const currentTheme = root.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        console.log('Tema cambiado a:', currentTheme);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const motivo = document.getElementById('motivo').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            const terminos = document.getElementById('terminos')?.checked;
            
            // Validaciones
            let errores = [];
            
            if (nombre.length < 3) {
                errores.push('El nombre debe tener al menos 3 caracteres');
            }
            
            if (!isValidEmail(email)) {
                errores.push('Ingresa un correo electrónico válido');
            }
            
            if (telefono && !isValidPhone(telefono)) {
                errores.push('Ingresa un número de teléfono válido');
            }
            
            if (!motivo) {
                errores.push('Selecciona un motivo de contacto');
            }
            
            if (mensaje.length < 10) {
                errores.push('El mensaje debe tener al menos 10 caracteres');
            }
            
            // Validar términos
            if (!terminos) {
                errores.push('Debes aceptar los términos y condiciones');
            }
            
            // Mostrar errores o continuar
            if (errores.length > 0) {
                showMessage(errores.join('<br>'), 'error');
                return;
            }
            
            // Guardar contacto
            const formData = {
                id: Date.now(),
                nombre: nombre,
                email: email,
                telefono: telefono,
                motivo: motivo,
                mensaje: mensaje,
                preferencia: document.querySelector('input[name="contacto"]:checked')?.value,
                fecha: new Date().toLocaleString('es-CO')
            };
            
            let contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
            contactos.push(formData);
            localStorage.setItem('contactos', JSON.stringify(contactos));

            contactMessage.classList.add('show');
            contactMessage.innerHTML = '¡Mensaje enviado correctamente! Te contactaré pronto. 🌹';
            contactMessage.className = 'contact-message success show';

            contactForm.reset();
            
            cargarContactos();

            setTimeout(() => {
                contactMessage.classList.remove('show');
            }, 5000);
        });
    }
    
    // Cargar contactos guardados
    function cargarContactos() {
        const contactosList = document.getElementById('contactosList');
        if (!contactosList) return;
        
        let contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
        
        if (contactos.length === 0) {
            contactosList.innerHTML = `
                <div class="sin-contactos">
                    <p>No hay contactos guardados aún</p>
                    <p style="font-size: 0.85rem; margin-top: 10px;">Los mensajes aparecerán aquí cuando alguien llene el formulario</p>
                </div>
            `;
            return;
        }
        
        // Ordenar del más reciente
        contactos.reverse();
        
        contactosList.innerHTML = contactos.map(contacto => `
            <div class="contacto-item" data-id="${contacto.id}">
                <div class="contacto-header">
                    <h3 class="contacto-nombre">👤 ${contacto.nombre}</h3>
                    <div>
                        <span class="contacto-fecha">📅 ${contacto.fecha}</span>
                        <button class="btn-delete-contact" onclick="eliminarContacto(${contacto.id})">🗑️ Eliminar</button>
                    </div>
                </div>
                <div class="contacto-info">
                    <div class="contacto-dato"><strong>✉️ Email:</strong> ${contacto.email}</div>
                    <div class="contacto-dato"><strong>📞 Teléfono:</strong> ${contacto.telefono || 'No especificado'}</div>
                    <div class="contacto-dato"><strong>📋 Motivo:</strong> ${contacto.motivo}</div>
                </div>
                <div class="contacto-mensaje">
                    <strong>💬 Mensaje:</strong><br>
                    ${contacto.mensaje}
                </div>
                <div class="contacto-preferencia">
                    Preferencia: ${contacto.preferencia === 'correo' ? '✉️ Correo' : '📞 Teléfono'}
                </div>
            </div>
        `).join('');
    }
    
    // Eliminar contacto individual
    window.eliminarContacto = function(id) {
        if (confirm('¿Estás seguro de eliminar este contacto?')) {
            let contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
            contactos = contactos.filter(c => c.id !== id);
            localStorage.setItem('contactos', JSON.stringify(contactos));
            cargarContactos();
        }
    };
    
    // Limpiar todos los contactos
    const btnLimpiar = document.getElementById('btnLimpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            if (confirm('¿Estás seguro de eliminar TODOS LOS CONTACTOS?.')) {
                localStorage.removeItem('contactos');
                cargarContactos();
            }
        });
    }
    
    // Validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validar teléfono
    function isValidPhone(phone) {
        const re = /^[\d\s\-\+\(\)]{7,}$/;
        return re.test(phone);
    }
    
    // Mostrar mensaje
    function showMessage(message, type) {
        if (!contactMessage) return;
        contactMessage.innerHTML = message;
        contactMessage.className = `contact-message ${type} show`;
        setTimeout(() => {
            contactMessage.classList.remove('show');
        }, 5000);
    }
    
    // Cargar contactos al iniciar
    cargarContactos(); 
});

// Carrusel pasatiempos
let currentIndex = 0;
let autoPlayInterval;
let isPaused = false;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const progressBar = document.querySelector('.progress-bar');
const carouselHero = document.querySelector('.carousel-hero');
const totalSlides = slides.length;
let progress = 0;

// Velocidad
const AUTOPLAY_SPEED = 7000;
const PROGRESS_INTERVAL = 50;
const PROGRESS_STEP = 100 / (AUTOPLAY_SPEED / PROGRESS_INTERVAL);

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    if (track && slides.length > 0) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar slides activas
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Resetear progreso
        progress = 0;
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }
}

function moveCarousel(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    
    updateCarousel();
    if (!isPaused) resetAutoPlay();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    if (!isPaused) resetAutoPlay();
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    progress = 0;
    if (progressBar) progressBar.style.width = '0%';
    if (!isPaused) startAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        progress += PROGRESS_STEP;
        
        if (progressBar) {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
        
        if (progress >= 100) {
            moveCarousel(1);
        }
    }, PROGRESS_INTERVAL);
}

// Pausa con el mouse
function pauseCarousel() {
    isPaused = true;
    clearInterval(autoPlayInterval);
}

function resumeCarousel() {
    isPaused = false;
    resetAutoPlay();
}

// Pausar en cualquier parte del carrusel
if (carouselHero) {
    carouselHero.addEventListener('mouseenter', pauseCarousel);
    carouselHero.addEventListener('mouseleave', resumeCarousel);
    
    // Para celular
    carouselHero.addEventListener('touchstart', pauseCarousel);
    carouselHero.addEventListener('touchend', resumeCarousel);
}

// Pausar en la flechas
document.querySelectorAll('.carousel-arrow, .indicator').forEach(el => {
    el.addEventListener('click', () => {
        pauseCarousel();
        setTimeout(resumeCarousel, 3000);
    });
});

// INICIAR CARRUSEL
if (slides.length > 0) {
    updateCarousel();
    startAutoPlay();
}
