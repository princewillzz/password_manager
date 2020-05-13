const search_form = document.getElementById('search_form')

//csrftoken = search_form.getElementsByTagName('input')[0].value

search_form.addEventListener('submit', function(event){
    event.preventDefault()

    input_data = document.querySelector('#searching_entity')
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
        const ele = document.createElement('li')
        ele.innerHTML = "Password: " + data["message"]
        document.querySelector('#password_container').append(ele)
    })   
    input_data.value = '' 
})
