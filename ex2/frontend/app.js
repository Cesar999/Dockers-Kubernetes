const url = 'http://localhost:3001';

let input_name = document.querySelector("#input-name");
let input_type = document.querySelector("#input-type");
let input_level = document.querySelector("#input-level");

let post_btn = document.querySelector(".post-btn");

let post_alert = document.querySelector(".post-alert");

post_btn.disabled = true;

let post = document.querySelector(".post");
post.addEventListener('keydown', ()=>{
    if(input_name.value.length < 2|| 
        input_type.value.length < 2||
        input_level.value.length < 2){
            post_btn.disabled = true;
    } else {
        post_btn.disabled = false;
    }
})




post_btn.addEventListener('click',onClickPost);

function onClickPost(){
    const obj = {};
    obj.name = input_name.value;
    obj.type = input_type.value;
    obj.level = input_level.value;

    sendData(obj, '/save-pok')
    .then((res)=>{
        input_name.value= '';
        input_type.value= '';
        input_level.value= '';
        post_alert.textContent = JSON.parse(res).msg;
        setTimeout(()=>{
            post_alert.textContent = '';
        },2000);
    }).catch(()=>{

    });
}

function sendData(obj, _path){
    return fetch(url+_path, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((res)=>{
        if(res.ok) {
            return res.text();
        } else {
            return false;
        }
    }).catch(()=>{
        return false;
    });
}

//-------------------------------------

let get_btn = document.querySelector(".get-btn");
get_btn.addEventListener('click',onClickGet);

let get_name = document.querySelector("#get-name");
let get_type = document.querySelector("#get-type");
let get_level = document.querySelector("#get-level");

let find_name = document.querySelector("#find-name");

function onClickGet(){
    const obj = {};
    obj.name = find_name.value;

    sendData(obj, '/get-pok')
    .then((resStr)=>{
        const res = JSON.parse(resStr);
        get_name.value = res.name;
        get_type.value = res.type;
        get_level.value = res.level;
    }).catch(()=>{

    });
}
