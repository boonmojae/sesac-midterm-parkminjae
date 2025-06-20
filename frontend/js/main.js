//가상 유저 목록
 import { users, todos } from "./data.js"

const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// 에러 메시지 표시/숨김 함수
function showError(input, errorElement) {
    input.classList.add('input-error');
    errorElement.style.display = 'block';
}

function hideError(input, errorElement) {
    input.classList.remove('input-error');
    errorElement.style.display = 'none';
}

// 실시간 입력 검증
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
        hideError(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.trim()) {
        hideError(passwordInput, passwordError);
    }
});

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const inputEmail = emailInput.value.trim();
    const inputPassword = passwordInput.value.trim();
    const statusDiv = document.getElementById('status');

    // 에러 상태 초기화
    hideError(emailInput, emailError);
    hideError(passwordInput, passwordError);
    statusDiv.style.display = 'none';

    let hasError = false;

    // 개별 필드 검증
    if (!inputEmail) {
        showError(emailInput, emailError);
        hasError = true;
    }

    if (!inputPassword) {
        showError(passwordInput, passwordError);
        hasError = true;
    }

    // 에러가 있으면 로그인 처리 중단
    if (hasError) {
        return;
    }

    // users 일치하는 사용자 찾기
    const validUser = users.find(user =>
        user.email === inputEmail && user.password === inputPassword
    );

    if (validUser) {
        // 유효한 사용자 - 로그인 성공
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            email: validUser.email,
            password: validUser.password
        }));

        window.location.href = 'todo.html';

    } else {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('currentUser');

        statusDiv.className = '';
        statusDiv.innerHTML = `<span style="color: red;">이메일 또는 비밀번호가 일치하지 않습니다.</span>`;
        statusDiv.style.display = 'block';
    }
});






// 로컬스토리지 초기화 함수
function clearStorage() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    // 폼 초기화
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    // 에러 상태 초기화
    hideError(emailInput, emailError);
    hideError(passwordInput, passwordError);

    // 상태 메시지 숨김
    document.getElementById('status').style.display = 'none';

    alert('로컬스토리지가 초기화되었습니다.');
    console.log('로컬스토리지 초기화 완료');
}


//----------------------------------------





function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && currentUser) {
        // 로그인된 사용자 - 메인 콘텐츠 표시
        const user = JSON.parse(currentUser);
        document.getElementById('currentUserEmail').textContent = user.email;
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('loginRequired').style.display = 'none';
        
    } else {
        // 로그인되지 않은 사용자 - 접근 거부 메시지 표시
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('loginRequired').style.display = 'block';
        
    }
}







