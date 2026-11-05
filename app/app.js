const form = document.querySelector('#form');
const box = document.querySelector('.box');
const filter = document.querySelector('#filter');
const counter = document.querySelector('#counter')
let filteredTickets;
let title
let priority
let tickets = []

form.addEventListener('submit', (e) => {
    e.preventDefault();
    title = e.target.title.value
    priority = e.target.priority.value
    const newTicket = addTicket(title, priority)
    filter.value = 'all'
    box.innerHTML = tickets.map((ticket) => 
        {
            return (
            `<div class="quest">
                <p id="quest-title">${ticket.title}</p>
                <p id="quest-priority">${ticket.priority}</p>
                <select onchange="changeStatus(${ticket.id})" id="status" name="status" value="${ticket.status}">
                    <option  value="new">new</option>
                    <option  value="doing">doing</option>
                    <option  value="done">done</option>
                </select>
            </div>`
            )
        }
        ).join('')
    e.target.title.value = ''
    counter.innerHTML = `${tickets.length}/${tickets.length}`

})

const addTicket = (title, priority) => {
    if (tickets.length >= 1000) {
        alert('Maximum number of tickets reached')
        return
    }

    title = title.trim()
    if (title.length < 3 || title.length > 80) {
        alert('Title must be between 3 and 80 characters')
        return
    }

    const id = tickets.length + 1
    tickets.push({ id, title, priority, status: 'new' })
    return tickets[tickets.length - 1]
}

const changeStatus = (id) => {
    const status = document.querySelectorAll(`#status`)[id - 1].value
    tickets[id - 1].status = status

}

filter.addEventListener('change', (e)=>{
    const filterValue = e.target.value
    
    filteredTickets = filterValue === 'all' ? tickets : tickets.filter((ticket) => ticket.status === filterValue)
    console.log(filteredTickets);

    if(filteredTickets.length) {
        box.innerHTML = filteredTickets.map((ticket) => 
        {
            return (
            `<div class="quest">
                <p id="quest-title">${ticket.title}</p>
                <p id="quest-priority">${ticket.priority}</p>
               <select onchange="changeStatus(${ticket.id})" id="status" name="status">
    <option value="new" ${ticket.status === 'new' ? 'selected' : ''}>new</option>
    <option value="doing" ${ticket.status === 'doing' ? 'selected' : ''}>doing</option>
    <option value="done" ${ticket.status === 'done' ? 'selected' : ''}>done</option>
</select>
            </div>`
            )
        }
        ).join('')
    } else {
        box.innerHTML = "No matches elements"
    }
    
    counter.innerHTML = `${filteredTickets.length}/${tickets.length}`
})


