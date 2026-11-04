const form = document.querySelector('#form');
const box = document.querySelector('.box');
let title
let priority
let tickets = []

form.addEventListener('submit', (e) => {
    e.preventDefault();
    title = e.target.title.value
    priority = e.target.priority.value
    const newTicket = addTicket(title, priority)
    box.innerHTML +=
        `<div class="quest">
        <p id="quest-title">${newTicket.title}</p>
        <p id="quest-priority">${newTicket.priority}</p>
        <select onselect="changeStatus(${newTicket.id})" id="status" name="status" value="${newTicket.status}" required>
            <option value="new">new</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        </select>
    </div>`
    e.target.title.value = ''

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
    tickets.find(ticket => ticket.id === id)
    //tu trzeba dokonczyc
}





