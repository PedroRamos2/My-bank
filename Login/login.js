// Toggle between login and registration forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

    // Clear all error messages and form fields
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
        input.value = '';
    });
}

// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    
    // Toggle eye icon
    const img = button.querySelector('img');
    img.style.opacity = type === 'text' ? '1' : '0.6';
}

// Validate CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validate digits
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// Format CPF input
function formatCPF(cpf) {
    return cpf.replace(/\D/g, '')
             .replace(/(\d{3})(\d)/, '$1.$2')
             .replace(/(\d{3})(\d)/, '$1.$2')
             .replace(/(\d{3})(\d{1,2})/, '$1-$2')
             .replace(/(-\d{2})\d+?$/, '$1');
}

// Format phone number
function formatPhone(phone) {
    return phone.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1');
}

// Detect and format input type (CPF, phone, or email)
function formatLoginIdentifier(input) {
    const value = input.value.replace(/\D/g, '');
    
    // If it's an email (contains @ symbol)
    if (input.value.includes('@')) {
        return;
    }
    
    // If it looks like a CPF (11 digits)
    if (value.length <= 11) {
        input.value = formatCPF(value);
        return;
    }
    
    // If it looks like a phone number (more than 11 digits or starts with typical phone patterns)
    input.value = formatPhone(value);
}

// Validate email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password
function validarSenha(senha) {
    // Minimum 8 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(senha);
}

// Validate age (must be 18 or older)
function validarIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade >= 18;
}

// Add input masks
document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const loginIdentifierInput = document.getElementById('loginIdentifier');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            e.target.value = formatCPF(e.target.value);
        });
    }

    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }

    if (loginIdentifierInput) {
        loginIdentifierInput.addEventListener('input', (e) => {
            formatLoginIdentifier(e.target);
        });
    }
});

// Handle registration
function fazerCadastro(event) {
    event.preventDefault();
    let hasError = false;

    // Get form values
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    // Validate name
    if (nomeCompleto.trim().split(' ').length < 2) {
        document.getElementById('nomeError').textContent = 'Digite seu nome completo';
        document.getElementById('nomeCompleto').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('nomeError').textContent = '';
        document.getElementById('nomeCompleto').classList.remove('error');
    }

    // Validate phone
    if (telefone.replace(/\D/g, '').length !== 11) {
        document.getElementById('telefoneError').textContent = 'Telefone inválido';
        document.getElementById('telefone').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('telefoneError').textContent = '';
        document.getElementById('telefone').classList.remove('error');
    }

    // Validate email
    if (!validarEmail(email)) {
        document.getElementById('emailError').textContent = 'Email inválido';
        document.getElementById('email').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('emailError').textContent = '';
        document.getElementById('email').classList.remove('error');
    }

    // Validate CPF
    if (!validarCPF(cpf)) {
        document.getElementById('cpfError').textContent = 'CPF inválido';
        document.getElementById('cpf').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('cpfError').textContent = '';
        document.getElementById('cpf').classList.remove('error');
    }

    // Validate password
    if (!validarSenha(senha)) {
        document.getElementById('senhaError').textContent = 'A senha deve ter no mínimo 8 caracteres, uma letra e um número';
        document.getElementById('senha').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('senhaError').textContent = '';
        document.getElementById('senha').classList.remove('error');
    }

    // Validate password confirmation
    if (senha !== confirmarSenha) {
        document.getElementById('confirmarSenhaError').textContent = 'As senhas não coincidem';
        document.getElementById('confirmarSenha').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('confirmarSenhaError').textContent = '';
        document.getElementById('confirmarSenha').classList.remove('error');
    }

    // Validate age
    if (!validarIdade(dataNascimento)) {
        document.getElementById('idadeError').textContent = 'É necessário ter 18 anos ou mais';
        document.getElementById('dataNascimento').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('idadeError').textContent = '';
        document.getElementById('dataNascimento').classList.remove('error');
    }

    if (hasError) return false;

    // Check if user already exists
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExiste = usuarios.some(u => 
        u.cpf.replace(/\D/g, '') === cpf.replace(/\D/g, '') || 
        u.email === email || 
        u.telefone.replace(/\D/g, '') === telefone.replace(/\D/g, '')
    );

    if (usuarioExiste) {
        alert('Usuário já cadastrado com este CPF, email ou telefone!');
        return false;
    }

    // Save user
    const usuario = {
        nomeCompleto,
        telefone,
        email,
        cpf,
        senha, // Note: In a real application, you should hash the password
        dataNascimento
    };

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Cadastro realizado com sucesso!');
    toggleForms();
    return false;
}

// Handle login
function fazerLogin(event) {
    event.preventDefault();
    
    const identifier = document.getElementById('loginIdentifier').value;
    const senha = document.getElementById('loginSenha').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Clean up identifier (remove formatting from CPF and phone)
    const cleanIdentifier = identifier.replace(/\D/g, '');

    const usuario = usuarios.find(u => 
        (u.cpf.replace(/\D/g, '') === cleanIdentifier || 
        u.email === identifier || 
        u.telefone.replace(/\D/g, '') === cleanIdentifier) &&
        u.senha === senha
    );

    if (usuario) {
        // Remove senha before storing in localStorage
        const { senha, ...usuarioSemSenha } = usuario;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSemSenha));
        window.location.href = '../Paginas/home.html';
    } else {
        document.getElementById('loginIdentifierError').textContent = 'Usuário ou senha incorretos';
        document.getElementById('loginIdentifier').classList.add('error');
        document.getElementById('loginSenha').classList.add('error');
    }

    return false;
} 