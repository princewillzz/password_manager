const search_form = document.getElementById('search-form');

search_form.addEventListener('submit', function(event) {
    event.preventDefault()

    input_data = document.querySelector('#search-entity')
    if (input_data.value == '') return

    csrftoken = search_form.getElementsByTagName('input')[0].value 
    //console.log(input_data.value, csrftoken)
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(input_data.value)
    })
    .then((response)=> response.json())
    .then((data)=> {
        console.log('Success:', data);
        var element = document.createElement('li')
        element.className = "listing"
        var text = document.createTextNode("password: "+data["password"]) 
        element.appendChild(text)
        document.querySelector('#password-list').appendChild(element)
    })   
    input_data.value = '' 
});
