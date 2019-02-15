const url = 'http://localhost:3001'; //Localhost
//const url = 'http://192.168.99.100:3001'; //Dockers
//const url = 'server';

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


let post_card = document.querySelector(".post.card");
let get_card = document.querySelector(".get.card");

let post_card_back = document.querySelector(".post.card.back");
let get_card_back = document.querySelector(".get.card.back");

post_card.addEventListener('click',rotateCard);
get_card.addEventListener('click',rotateCard);
post_card_back.addEventListener('click',rotateCard);
get_card_back.addEventListener('click',rotateCard);


function rotateCard(e){

    if(e.target.className === 'post card'
     ||e.target.className === 'post card back'){
        post_card.className = 'post card rotate-card';
        post_card_back.className = 'post card back rotate-back';
    } else if(e.target.className === 'post card rotate-card'
    ||e.target.className === 'post card back rotate-back'){
        post_card.className = 'post card';
        post_card_back .className = 'post card back';
    }

    if(e.target.className === 'get card'
    ||e.target.className === 'get card back'){
        get_card.className = 'get card rotate-card';
       get_card_back.className = 'get card back rotate-back';
    } else if(e.target.className === 'get card rotate-card'
    ||e.target.className === 'get card back rotate-back'){
        get_card.className = 'get card';
        get_card_back.className = 'get card back';
    }


}