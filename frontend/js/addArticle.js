document.getElementById('addArticleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const tags = e.target.tags.value;
    const content = e.target.content.value;
    const pdf = e.target.pdf.files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags);
    formData.append('content', content);
    formData.append('pdf', pdf);

    const response = await fetch('/articles', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    if (data.success) {
        alert('Статья добавлена');
        window.location.href = 'main.html';
    } else {
        alert(data.message);
    }
});
