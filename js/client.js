const socket  = io('http://localhost:8000')
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

var audio = new Audio('../ting.mp3')

function append(message, position){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
});

socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left')
});

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left');
})
