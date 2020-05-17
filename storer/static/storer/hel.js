
document.addEventListener('DOMContentLoaded', () => {
    fetch("getPassword")
    .then(response => response.json())
    .then(data => {
        for(var i = 0; i < data.length; i++) {        
            load_password(data[i])
        }
    })
})



