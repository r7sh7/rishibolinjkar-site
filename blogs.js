
window.addEventListener('DOMContentLoaded', ()=>renderBlogs());

const container = document.querySelector('.blog-container');

const renderBlogs = async () => {
    let uri = "http://localhost:3000/blogs";

    const res = await fetch(uri);
    console.log(res);
    const blogs = await res.json();

    let template = '';

    blogs.forEach(blog => {
        template += `
        <li>
        <article class="showcase-list container container-center ">
        <h1 style="margin-bottom: 0.5rem;">
            <a class="link-primary" href="blogs/blog1.html" target="_blank">${blog.title}</a>
        </h1>
        <small>${blog.date}</small>
        <p>${blog.snippet.slice(0,102)}...</p>
        </article>
    </li>
    `
    });
    
    container.innerHTML = template;
}