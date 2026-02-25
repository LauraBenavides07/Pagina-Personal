//Para cambiar de tema a oscuro a claro
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    console.log('Botón encontrado:', themeToggle);
    
    if (!themeToggle) {
        console.log('No se encontró el botón themeToggle');
        return;
    }
    
    //Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme');
    console.log('Tema guardado:', savedTheme);
    
    if (savedTheme === 'light') {
        root.classList.add('light-theme');
        console.log('Tema claro activado');
    }
    
    //Cambiar tema al hacer clic
    themeToggle.addEventListener('click', function() {
        root.classList.toggle('light-theme');
        
        const currentTheme = root.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        console.log('Tema cambiado a:', currentTheme);
    });
});

//Para lo de contacto
document.addEventListener('DOMContentLoaded', () => {
   //Formulario de contacto 
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            //Mostrar mensaje de guardado con exito
            contactMessage.classList.add('show');
            
            //Limpiar formulario
            contactForm.reset();
            
            //Ocultar mensaje 5 segundos despues
            setTimeout(() => {
                contactMessage.classList.remove('show');
            }, 5000);
        });
    }
});

