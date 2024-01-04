const buttonMyBusiness = document.getElementById('132');
const buttonAdd = document.getElementById('150');
const input = document.getElementById("num")
const delet = document.getElementById('delete');
const todoContainer = document.getElementById('io');
const DeleteModal = document.getElementById('134');
const modal = document.getElementById('133');
const paginationContainer = document.querySelector('.list_bottom');
const removeAllContainer = document.getElementById('list_delete_ul');
const applayDeleteTodoItemModal = document.getElementById('yesButton');
const closeDeleteTodoItemModal = document.getElementById('noButton');
const deleteTodoItemModal = document.getElementById('modalSP');

buttonMyBusiness.addEventListener('click', () => {
    modal.classList.remove('active')
})
window.onclick = function (event) {
    if (event.target == DeleteModal) {
        modal.classList.add('active');
    }
}

let todoList = [];

if (localStorage.getItem('todoLink')) {
    todoList.push(
        ...JSON.parse(localStorage.getItem('todoLink'))
    );
    renderTodoList(todoList.slice(0, 10));
}

buttonAdd.addEventListener('click', validateInput);
input.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        validateInput()
    }
});

function addItem() {
    let newTodo = {
        todo: input.value,
        checked: false,
        important: false,
        id: Math.random()
    };
    todoList.unshift(newTodo);
    todoList = unDuplicateArraySingleValues();
    console.log(todoList);
    renderTodoList(todoList.slice(0, 10));
    renderPagination();
    toggleRemoveAllContainer()
    localStorage.setItem('todoLink', JSON.stringify(todoList));
}

function deleteTask(id) {
    todoList = todoList.filter((task) => task.id != id)
    renderTodoList(todoList);
    renderPagination();
    toggleRemoveAllContainer()
    localStorage.setItem('todoLink', JSON.stringify(todoList));
}

// ..............................................................
function filtTask() {
    let checkedFals = todoList.filter(checkbox => !checkbox.checked);
    let checkedFalsd = todoList.filter(checkbox => checkbox.checked);
    todoList = checkedFals.concat(checkedFalsd);
    todoContainer.innerHTML = "";
    renderTodoList(todoList);
    renderPagination();
    toggleRemoveAllContainer()
    localStorage.setItem('todoLink', JSON.stringify(todoList));
}

function setCheck(id) {
    todoList = todoList.map(function (item) {
        if (item.id === id) {
            item.checked = !item.checked
        }
        return item;
    });
    localStorage.setItem('todoLink', JSON.stringify(todoList));
}

input.addEventListener('input', myFunctionFilt);
function myFunctionFilt() {
    var filter, ul, li, a, i, txtValue;
    filter = input.value.toUpperCase();
    ul = document.getElementById("io");
    li = ul.querySelectorAll('.information-bar');
    for (i = 0; i < li.length; i++) {
        delo = li[i].getElementsByClassName('delo')[0];
        txtValue = delo.textContent || delo.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function marginLeft() {
    document.getElementById('arrow-object').addEventListener("mouseover", function () {
        document.getElementById('arrow').style.display = 'block';
        document.getElementById('arrow').addEventListener("click", function () {
            modal.classList.add('active');
        })

    })
    document.getElementById('arrow-object').addEventListener("mouseout", function () {
        document.getElementById('arrow').style.display = 'none';
    })
}
marginLeft()

function createPagin(i) {
    const element = document.createElement('div');
    element.classList.add('number_list');
    element.innerHTML = i + 1;
    element.addEventListener('click', function () {
        todoContainer.innerHTML = "";
        let min = i > 0 ? i * 10 : 0; //console.log(min)
        let max = (i + 1) * 10; //console.log(max)
        let todoListSlice = todoList.slice(min, max);
        renderTodoList(todoListSlice);
        //console.log(todoListSlice);
    });
    return element;
}

let getTotals = function () {
    if (todoList.length > 10) {
        return Math.round((todoList.length + 4) / 10) * 10 / 10;
    } else {
        return 1
    }
};


let renderPagination = () => {
    toggleDisplayPaginConttainer()
    paginationContainer.innerHTML = "";
    // console.log(getTotals())
    for (let i = 0; i < getTotals(); i++) {
        const element = createPagin(i);
        paginationContainer.append(element);
    }
};
renderPagination();

function toggleDisplayPaginConttainer() {
    if (!todoList.length) {
        paginationContainer.style.display = 'none';
    } else {
        paginationContainer.style.display = 'flex';

    }
}

function renderTodoList(list) {
    todoContainer.innerHTML = "";
    list.forEach(function (item) {
        const onClick = () => {
            deleteTodoItemModal.style.display = 'block';
            applayDeleteTodoItemModal.addEventListener('click', function () {
                deleteTodoItemModal.style.display = 'none';
                deleteTask(item.id);
            });
            closeDeleteTodoItemModal.addEventListener('click', function () {
                deleteTodoItemModal.style.display = 'none';
            });
            bottomClose();
        }
        const onChange = () => {
            setCheck(item.id);
            filtTask();
        }
        const todo = new TodoItem(item, onChange, onClick);
        const elementRender = todo.render();
        todoContainer.append(elementRender);

    });
}

const deleteElement = () => {
    todoList = [];
    localStorage.setItem('todoLink', JSON.stringify(todoList));
    renderTodoList(todoList);
    renderPagination();
    toggleRemoveAllContainer()
}
removeAllContainer.addEventListener('click', deleteElement);

const toggleRemoveAllContainer = () => {
    if (!todoList.length) {
        removeAllContainer.style.display = 'none';
    } else {
        removeAllContainer.style.display = 'flex';
    }
}
toggleRemoveAllContainer()

function validateInput() {
    var inputValue = document.getElementById("num").value;
    // var pattern = /^\S+$/;
    if (inputValue.length > 0) {
        addItem()
        input.value = "";
        input.focus();
    } else {
        alert("Пожалуйста, введите данные.");
    }
}

function unDuplicateArraySingleValues() {
    let todoListResult = [];
    for (let i = 0; todoList.length > i; i++) {
        if (!todoListResult.some((item) => item.todo == todoList[i].todo)) {
            todoListResult.push(todoList[i])
        }
    }
    return todoListResult;
}

///////////////////SOME///////////////////
// 2 компонента list и /modal/
// Что такое и какйо функционал имеет modal 


















//  todoList.filter((item) => item.todo !== newTodo.todo);
//Добавление элемента через modal,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.
// class List
// class Pagination
//button
//modal
// sort переделать

// / const deleteElemenst = () => {
//     if (todoList.length < 10) {
//         document.getElementById('list').style.display = 'none';
//     } else {
//         document.getElementById('list').style.display = 'flex';
//     }
// }

// let bottomClose = () => {
//     if (todoList === undefined || todoList.length == 0) {
//         removeAllContainer.style.display = 'none';
//     }
// }

// document.querySelector('.number_list').style.display = 'block';
// removeAllContainer.style.display = 'block';

// let arr_2 = todoList.filter((item, index) => {
//     return arr.indexOf(item) === index
// });
// console.log(arr_2);
// console.log(todoList)

// const tags = [...document.querySelectorAll('.information-bar')];
// const texts = new Set(tags.map(x => x.innerHTML));
// tags.forEach(tag => {
//   if(texts.has(tag.innerHTML)){
//     texts.delete(tag.innerHTML);
//   }
//   else{
//     tag.remove()
//   }
// })

//     todoList.innerHTML = "";
//     for (let i = 0; i < divs.length; i++) {
//         if (!todoList.includes(divs[i])) {
//             todoList.push(divs[i]);
//         }
//         return todoList;
//     }

// let deleteFunc = () => {

// // // Получаем коллекцию всех div'ов
// const divs = document.querySelectorAll('.oi div');
// // Создаем новый пустой массив
// let uniqueDivs = [];
// // // Проходимся по каждому div'у
// for (let i = 0; i < divs.length; i++) {
//     // Проверяем, есть ли уже такой элемент в уникальном массиве
//     if (!uniqueDivs.includes(divs[i])) {
//         // Если нет, добавляем его в уникальный массив
//         uniqueDivs.push(divs[i]);
//     }
// }
// // // Очищаем родительский div и добавляем обратно уникальные div'ы
// document.querySelector('.divs').innerHTML = "";

// console.log(uniqueDivs);
// }
// function myFunctionFilt() {
//     var filter, ul, li, a, i, txtValue;
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("io");
//     li = ul.querySelectorAll('.information-bar');
//     // console.log(li)
//     for (i = 0; i < li.length; i++) {
//         delo = li[i].getElementsByClassName('delo')[0];
//         txtValue = delo.textContent || delo.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             // li[i].style.display = "";
//             li[i].remove()
//         } else {
//             // li[i].style.display = "none";
//             li[i].remove()
//         }
//     }
// }

// let deleteFunc = (nomer) => {
//    let l = nomer.textContent
//    document.querySelectorAll('.information-bar').forEach(f)
// }
//  let asdfg = function uniqueElements(arr) {
//     arr.filter((index) => todoContainer.indexOf(querySelectorAll('.information-bar').textContent) === index.textContent).remove();
//   }

//   asdfg();

// function deleteReplic()  {
//     var  ul, li, i;
//     ul = document.getElementById("io");
//     li = ul.querySelectorAll('.information-bar');
//     for (i = 0; i < ul.length; i++) {
//         delo = li[i].getElementsByClassName('delo');
//        if( delo.textContent || delo.innerText === i.textContent || i.innerText){
//         li[i].remove()
//        }
//     }
// }
// function createElement(item) {
//     let checkbox = document.createElement('input');
//     const numberDiv = document.createElement('div');
//     let newList = document.createElement('div');
//     const delo = document.createElement('div');
//     const buttonTwo = document.createElement('div');
//     const asd = document.createElement('div');

//     numberDiv.classList.add('number-div')
//     newList.classList.add('information-bar');
//     delo.classList.add('delo');
//     buttonTwo.classList.add('button_two');

//     delo.innerHTML = item.todo;
//     buttonTwo.innerHTML = '&times;';
//     asd.style.display = 'flex';

//     asd.append(checkbox);
//     asd.append(numberDiv);
//     asd.append(delo);
//     newList.append(asd);
//     newList.append(buttonTwo);

//     checkbox.type = 'checkbox';
//     checkbox.id = 'chech';
//     checkbox.name = 'checkbox-name';

//     checkbox.checked = item.checked
//     checkbox.addEventListener('change', function () {
//         setCheck(item.id);
//         filtTask()
//     });
//     buttonTwo.addEventListener('click', function () {
//         newList.remove();
//         deleteTask(item.id);
//         bottomClose();
//     });

//     return newList

// };

// function renderList() {
//     const todoLists = document.querySelectorAll('.information-bar');
//     todoLists.forEach(function (todo, i) {
//         const divNumber = todo.querySelector('.number-div');
//         divNumber.innerHTML = i + 1 + ")";
//     });
// }


// function changeTheColor() {
//     buttonAdd.onmouseenter = function () {
//         if (input.value.trim().length === 0) {
//             buttonAdd.style.background = 'rgb(109 23 23)';
//             buttonAdd.value = 'Удалить всe';
//         }
//         if (input.value.trim().length === 0) {
//             const deleteElement = () => {
//                 deletingTheWhole()
//                 todoContainer.innerHTML = "";
//                 buttonAdd.removeEventListener('click', deleteElement)
//             }
//             buttonAdd.addEventListener('click', deleteElement);
//         }
//         buttonAdd.onmouseleave = function () {
//             buttonAdd.value = 'Добавить';
//             buttonAdd.style = "button_one";
//         }
//     }
// }
// changeTheColor()

// function deletingTheWhole() {
//     todoList = [];
//     localStorage.setItem('todoLink', JSON.stringify(todoList));
// // }