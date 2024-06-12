document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        displayProfile(user);
        displayBookmarks(user.bookmarks || []);
        if (user.email === 'kalitkin03@list.ru') {
            displayUserList();
        }
    }

    document.getElementById('editButton').onclick = () => {
        editProfile(user);
    };
});

function displayProfile(user) {
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <p>Email: ${user.email}</p>
        <p>Имя: ${user.username}</p>
    `;
}

function displayBookmarks(bookmarks) {
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = '<h3>Закладки</h3>';
    bookmarks.forEach(bookmark => {
        const li = document.createElement('li');
        li.textContent = bookmark.title;
        bookmarkList.appendChild(li);
    });
}

function displayUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<h3>Пользователи</h3>';
    fetch('/auth/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const div = document.createElement('div');
                div.innerHTML = `<p>${user.username} - ${user.email}</p>`;
                userList.appendChild(div);
            });
        });
}

function editProfile(user) {
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <input type="email" id="editEmail" value="${user.email}">
        <input type="text" id="editUsername" value="${user.username}">
        <button onclick="saveProfile()">Сохранить</button>
    `;
}

function saveProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    user.email = document.getElementById('editEmail').value;
    user.username = document.getElementById('editUsername').value;
    localStorage.setItem('user', JSON.stringify(user));
    alert('Профиль обновлен');
    displayProfile(user);
}
