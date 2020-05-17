const URL = "getPassword", key="website", value="password";


const search_form = document.getElementById('search-form');
search_form.addEventListener('submit', call_sender);

// Sends the POST request to the backend and fetchs the data to be rendered
function call_sender(event) {
    event.preventDefault();
    input_data = document.querySelector('#search-entity');
    input_data.value = input_data.value.trim();
    if (input_data.value == '') return;

    csrftoken = search_form.getElementsByTagName('input')[0].value;
    //console.log(input_data.value, csrftoken)
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(input_data.value)
    })
    .then((response)=> response.json())
    .then((data)=> {
        for(var i = 0; i < data.length; i++) {        
            load_password(data[i])
        }
    })   
    input_data.value = '';
}

// Render the password on the page when you ask it
function load_password(data){
    var element = document.createElement('li')
    element.className = "listing"

    var text_content = document.createElement('span');
    text_content.className = "text-content";
    var output_text = data[key] + ": " + data[value]
    const text = document.createTextNode(output_text) 
    text_content.appendChild(text);

    var clipboard = document.createElement('span');
    clipboard.className = "clipboard";
    const copy_icon = document.createElement('i');
    copy_icon.className = "far fa-copy";
    clipboard.appendChild(copy_icon);

    element.appendChild(text_content);
    element.appendChild(clipboard);

    document.querySelector('#password-list').appendChild(element);
}

// Copy password by clicking on the item
const item = document.getElementById("password-list");
item.addEventListener('click', event => {
    var element = event.target;

    if(element.className == "far fa-copy") {
        element = element.parentElement.parentElement;
    } else if(element.className == "clipboard") {
        element = element.parentElement;
    } else if(element.className === "text-content") 
        element = element.parentElement;

    // Actual animation
    if (element.className === 'listing') {
        tag = element.childNodes[0];
        var text = tag.innerHTML;
        text = text.split(":");
        const pwd = text[text.length-1].trim();

        const ele = document.createElement('textarea');
        ele.value = pwd;
        document.body.appendChild(ele);
        ele.select();
        ele.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(ele);
        element.style.animationPlayState = 'running';

        setTimeout(()=> {
            element.style.animationPlayState = 'paused';
        }, 3000);
    } 
} );



