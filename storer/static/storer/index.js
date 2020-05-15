const search_form = document.getElementById('search-form');

const URL = "getPassword"

search_form.addEventListener('submit', function(event) {
    event.preventDefault()

    input_data = document.querySelector('#search-entity')
    if (input_data.value == '') return

    csrftoken = search_form.getElementsByTagName('input')[0].value 
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
});

function load_password(data){
    var element = document.createElement('li')
    element.className = "listing"

    var text_content = document.createElement('span');
    text_content.className = "text-content";
    var output_text = data["website"] + ": " + data["password"]
    const text = document.createTextNode(output_text) 
    text_content.appendChild(text);

    var clipboard = document.createElement('span');
    clipboard.className = "clipboard";
    const copy_icon = document.createElement('i');
    copy_icon.className = "far fa-copy";
    clipboard.appendChild(copy_icon);

    element.appendChild(text_content);
    element.appendChild(clipboard);

    document.querySelector('#password-list').appendChild(element);}

document.addEventListener('click', event => {
    var element = event.target;

    if(element.className == "far fa-copy") {
        element = element.parentElement.parentElement;
    } else if(element.className == "clipboard") {
        element = element.parentElement;
    }

    if (element.className === 'listing') {
        element.style.animationPlayState = 'paused';
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
        
    } else if(element.className === "text-content") {
        element.parentElement.style.animationPlayState = 'paused';
        var text = element.innerHTML;
        text = text.split(":");
        const pwd = text[text.length-1].trim();

        const ele = document.createElement('textarea');
        ele.value = pwd;
        document.body.appendChild(ele);
        ele.select();
        ele.setSelectionRange(0, 99999);
        document.execCommand('copy');

        document.body.removeChild(ele);
        element.parentElement.style.animationPlayState = 'running';

    }
} );