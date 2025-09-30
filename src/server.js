const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')
const app = express()
const PORT = process.env.PORT || 3300

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { 
        success: false, 
        error: 'Muitas tentativas. Tente novamente em 1 hora.' 
    }
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mateushahn333@gmail.com',
        pass: 'ughf nzmk ipgh idys'
    }
})

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/about.html'))
})

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'))
})

app.get('/produtos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/products.html'))
})

app.get('/produto', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/product.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/blog.html'))
})

app.get('/blog/:articleId', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/article.html'));
});

app.get('/sucesso', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sucess.html'));
});

app.post('/enviar-contato', contactLimiter, express.json(), async (req, res) => {
    console.log('📧 Recebendo dados do formulário:', req.body);
    
    try {
        const { name, email, tel, assunto, message } = req.body;
        console.log('✅ Dados recebidos:', { name, email, tel, assunto });

        const mailOptions = {
            from: email,
            to: 'mateushahn333@gmail.com',
            subject: `📧 Contato do Site: ${assunto}`,
            html: `
                <h2>Novo contato do site Eletro Peças Carvalho</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${tel || 'Não informado'}</p>
                <p><strong>Assunto:</strong> ${assunto}</p>
                <hr>
                <p><strong>Mensagem:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        console.log('📤 Enviando email...');
        await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado com sucesso!');
        
        res.json({ success: true, message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao enviar mensagem. Tente novamente.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})