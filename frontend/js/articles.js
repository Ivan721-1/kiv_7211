document.addEventListener('DOMContentLoaded', () => {
    const article = JSON.parse(localStorage.getItem('currentArticle'));
    if (article) {
        document.getElementById('articleTitle').textContent = article.title;
        document.getElementById('articleTags').textContent = `Теги: ${article.tags}`;
        document.getElementById('articleContent').textContent = article.content;
        
        document.getElementById('bookmarkButton').onclick = () => {
            addBookmark(article);
        };

        document.getElementById('downloadButton').onclick = () => {
            downloadPDF(article);
        };
    }
});

function addBookmark(article) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user.bookmarks) {
        user.bookmarks = [];
    }
    user.bookmarks.push(article);
    localStorage.setItem('user', JSON.stringify(user));
    alert('Статья добавлена в закладки');
}

function downloadPDF(article) {
    const link = document.createElement('a');
    link.href = article.pdf;
    link.download = `${article.title}.pdf`;
    link.click();
}
