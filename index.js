const form = document.getElementById('contactForm')
const listForm = document.getElementById('listTasks')

function saveListToLocalStorage() {
    const items = Array.from(listForm.children);  
    const itemTexts = items.map(item => {
        const toggleButton = item.querySelector('button');
        return {
            text: item.textContent.replace(toggleButton.textContent, '').trim(),  
            status: toggleButton.textContent.trim().toLowerCase()  
        }
    })

    localStorage.setItem('listTasks', JSON.stringify(itemTexts));
}

function loadListFromLocalStorage() {
    const savedList = localStorage.getItem('listTasks');  

    if (savedList) {
        const items = JSON.parse(savedList); 
        items.forEach(item => {
            const li = document.createElement('li');  
            li.textContent = item.text

            
            const toggleButton = document.createElement('button')
            toggleButton.textContent = item.status === 'done' ? 'Done' : 'Todo';
            li.appendChild(toggleButton);

            listForm.appendChild(li)

            toggleButton.addEventListener('click', function() {
               
                if (toggleButton.textContent === 'Todo') {
                    toggleButton.textContent = 'Done'
                } else {
                    toggleButton.textContent = 'Todo'
                }

                saveListToLocalStorage()
            })
        })
    }
}


form.addEventListener('submit', function(event) {
    event.preventDefault() 

   
    const taskText = document.getElementById('tasks').value

    
    const li = document.createElement('li')
    li.textContent = taskText

    const toggleButton = document.createElement('button')
    toggleButton.textContent = 'Todo'
    li.appendChild(toggleButton)

    
    listForm.appendChild(li)

   
    toggleButton.addEventListener('click', function() {
     
        if (toggleButton.textContent === 'Todo') {
            toggleButton.textContent = 'Done';
        } else {
            toggleButton.textContent = 'Todo';
        }

       
        saveListToLocalStorage()
    })

   
    form.reset()

  
    saveListToLocalStorage()
})

loadListFromLocalStorage()
