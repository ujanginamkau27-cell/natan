let isRegisterMode = false;

// 1. Fungsi Ganti Tampilan (Login <-> Daftar)
function toggleMode() {
    isRegisterMode = !isRegisterMode;
    
    const formTitle = document.getElementById('formTitle');
    const mainBtn = document.getElementById('mainBtn');
    const toggleText = document.getElementById('toggleText');
    const emailGroup = document.getElementById('emailGroup');
    const rememberGroup = document.getElementById('rememberGroup');

    if (isRegisterMode) {
        formTitle.innerText = "Daftar Akun";
        mainBtn.innerText = "Daftar Sekarang";
        emailGroup.style.display = "block";
        rememberGroup.style.display = "none";
        toggleText.innerHTML = 'Sudah punya akun? <a href="#" onclick="toggleMode()">Login</a>';
        document.getElementById('email').required = true;
    } else {
        formTitle.innerText = "Login";
        mainBtn.innerText = "Login";
        emailGroup.style.display = "none";
        rememberGroup.style.display = "flex";
        toggleText.innerHTML = 'Gapunya akun? <a href="#" onclick="toggleMode()">Daftar</a>';
        document.getElementById('email').required = false;
    }
}

// 2. Logika Utama Form (Daftar & Login)
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const loader = document.getElementById('loader');

    if (isRegisterMode) {
        // --- LOGIKA DAFTAR ---
        const email = document.getElementById('email').value;
        const existingUser = localStorage.getItem(user);

        if (existingUser) {
            alert("Maaf, username '" + user + "' sudah digunakan. Pilih nama lain!");
        } else {
            localStorage.setItem(user, JSON.stringify({ email, pass }));
            alert("Pendaftaran Berhasil! Silakan Login.");
            toggleMode();
            this.reset(); // Mengosongkan input setelah daftar
        }
    } else {
        // --- LOGIKA LOGIN ---
        const savedData = localStorage.getItem(user);
        
        if (savedData) {
            const userData = JSON.parse(savedData);
            if (userData.pass === pass) {
                // Efek Loading Pemanis
                loader.style.display = 'flex';
                setTimeout(() => {
                    window.location.href = "calculator.html";
                }, 2000);
            } else {
                alert("Password salah!");
            }
        } else {
            alert("Akun tidak ditemukan. Silakan daftar dulu!");
        }
    }
});

// 3. Logika Lupa Sandi (Modal)
function openForgotModal(e) { 
    e.preventDefault(); 
    document.getElementById('forgotModal').style.display = "block"; 
}

function closeModal() { 
    document.getElementById('forgotModal').style.display = "none"; 
    document.getElementById('recoveryMessage').innerText = "";
}

function recoverPassword() {
    const email = document.getElementById('recoveryEmail').value;
    const msg = document.getElementById('recoveryMessage');
    
    if (!email) {
        msg.innerText = "Masukkan email Anda!";
        msg.style.color = "orange";
        return;
    }

    // Mencari data user berdasarkan email
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        
        if (data.email === email) {
            msg.innerText = "Sandi ditemukan: " + data.pass;
            msg.style.color = "green";
            return;
        }
    }
    msg.innerText = "Email tidak terdaftar!";
    msg.style.color = "red";
}   

// Fitur Show / Hide Password
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    // Cek tipe input saat ini
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Ganti ikon mata (buka/tutup)
    this.classList.toggle('bx-show');
    this.classList.toggle('bx-hide');
});