document.querySelectorAll('.cube, .current-cube').forEach(cubeDiv => {
    cubeDiv.addEventListener('click', (e) => {
        const element = e.target;
        if (element.classList.contains('more')) {
            const elementDesc = element.parentElement.querySelector('.description');
            if (elementDesc.style.display == 'block') {
                elementDesc.style.display='none';
                element.textContent = 'Още'
            }else{
                elementDesc.style.display='block';
                element.textContent = 'Скрий'
            }

        }

    })
})