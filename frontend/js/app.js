function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function checkAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === 'kalitkin03@list.ru') {
        document.getElementById('addArticleButton').style.display = 'block';
    }
}

function searchArticles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const articles = JSON.parse(localStorage.getItem('articles')) || [];

    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.tags.toLowerCase().includes(query)
    );

    displayArticles(filteredArticles);
}

function displayArticles(articles) {
    const articleList = document.getElementById('articleList');
    articleList.innerHTML = '';
    articles.forEach(article => {
        const li = document.createElement('li');
        li.textContent = article.title;
        li.onclick = () => {
            localStorage.setItem('currentArticle', JSON.stringify(article));
            window.location.href = 'article.html';
        };
        articleList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    checkAdmin();
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    displayArticles(articles);
});
