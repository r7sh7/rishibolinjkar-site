window.addEventListener('DOMContentLoaded', () => renderProjects());
const container = document.querySelector('.project-container');

const renderProjects = async () => {
    
    let uri = 'http://localhost:3000/projects';

    const res = await fetch(uri);
    const projects = await res.json();
    
    let template = '';
    projects.forEach(project => {
        template+= `<li>
        <article class="showcase-list container container-center ">
        <h1 style="margin-bottom: 0.5rem;">${project.title}</h1>
        <small>${project.date}</small>
        <p>${project.description}</p>

        <a class="link link-secondary" href="${project.link}" target="_blank">Live Project</a>
        <a class="link link-primary" href="${project.code}" target="_blank">View Source</a>

        </article>
    </li>`
    });

    container.innerHTML = template;

}