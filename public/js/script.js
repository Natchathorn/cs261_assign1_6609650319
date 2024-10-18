document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    submitLogin();
});

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU077c7e55d9566f5e5ff8d23712d81b3b63f45eb1a7003c7a669b6cdb508882dacc89925e84d8d6855fb09804b90339ac'
        },
        body: JSON.stringify({"UserName": username, "PassWord": password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            const popupMessage = `
                <strong>สถานะ :</strong> ${data.status ? "สำเร็จ" : "ไม่สำเร็จ"}<br>
                <strong>ประเภท :</strong> ${data.type}<br>
                <strong>ชื่อผู้ใช้ :</strong> ${data.username}<br>
                <strong>สถานะที่ TU :</strong> ${data.tu_status}<br>
                <strong>รหัสสถานะ :</strong> ${data.statusid}<br>
                <strong>ชื่อภาษาไทย :</strong> ${data.displayname_th}<br>
                <strong>ชื่อภาษาอังกฤษ :</strong> ${data.displayname_en}<br>
                <strong>อีเมล :</strong> ${data.email}<br>
                <strong>ภาควิชา :</strong> ${data.department}<br>
                <strong>คณะ :</strong> ${data.faculty}
            `;
            document.getElementById('popup-message').innerHTML = popupMessage;
            document.getElementById('popup').style.display = 'flex'; // Show popup
        } else {
            document.getElementById('message').innerText = "Login failed. Please try again.";
        }
    })
    .catch(error => console.error('Error:', error));
}

function sHowpass() {
    const x = document.getElementById("password");
    x.type = (x.type === "password") ? "text" : "password";
}

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});
