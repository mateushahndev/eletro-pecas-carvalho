document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('form-contact');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            tel: document.getElementById('tel').value,
            assunto: document.getElementById('assunto').value,
            message: document.getElementById('message').value
        };

        const captchaAnswer = document.getElementById('captcha').value;
        if (parseInt(captchaAnswer) !== 10) {
            alert('Resposta anti-spam incorreta. Tente novamente.');
            return;
        }

        try {
            const response = await fetch('/enviar-contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = '/sucesso';              
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            alert('❌ Erro ao enviar mensagem. Tente novamente ou nos contate por telefone.');
            console.error('Erro:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
});