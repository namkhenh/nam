// CODE EXPLAINED channel

const clear = document.querySelectorAll(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("toDo");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;

}

function loadList(array){
    array.forEach(function(item){
        add(item.name, item.id, item.done, item.trash);
    });
}


const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function add(toDo, id, done, trash){

    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            add(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            localStorage.setItem("toDo", JSON.stringify(LIST));

            id ++;
        }
        input.value = "";
    }

});

document.addEventListener("click", function(even){
        const toDo = input.value;
        if(toDo){
            add(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            localStorage.setItem("toDo", JSON.stringify(LIST));

            id ++;
        }
        input.value = "";
    });



function complete(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function remove(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        complete(element);
    }else if(elementJob == "delete"){
        remove(element);
    }

    localStorage.setItem("toDo", JSON.stringify(LIST));
})

document.getElementById("reload").addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})







/*let objTasks = [
]

function showTask (){
    let liTask = '';
    objTasks.map((item , index) => {
        liTask += `<li class="item">
        <i class="fa fa-circle-thin co" job="complete" id="0"></i>
        <p class="text">${item.name}</p>
        <i class="fa fa-trash-o de" job="delete" id="0"></i>
    </li></li>`
    })
    list.innerHTML = liTask;
}

function createTask(){
    let valueInput = input.value;
    let objTask = {
        id: objTasks.length == 0 ? 1 : objTasks[objTasks.length-1].id + 1,
        name: valueInput,
        isActive : true
    }
    objTasks.push(objTask);
    showTask();
    input.value = '';
}*/