window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const nameInput = document.querySelector('.name');
  newTodoForm = document.getElementById('todo-form');
  inputTodo = document.querySelector('.content');
  inputCatogery = document.getElementsByClassName('options');

  const username = localStorage.getItem('username') || '';
  nameInput.value = username;

  nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value);
  });
  newTodoForm.addEventListener('submit', e => {
    e.preventDefault();
  

    buttonType = e.target.childNodes[11].name;

    if(buttonType == 'Edit'){
      EditData(e);
    }
    else if((e.target.content.value == '') || (e.target.category.value == '')){
      let msg = 'Please fill out task todo as well as category';
      if(e.target.content.value == ''){
         msg = 'Please fill out task  todo'
      }
      if (e.target.category.value == ''){
         msg = 'Please fill out category of task todo'
      }
      MyNotification(msg);
    }
    else{
      const todo = {
        content: e.target.content.value,
        category: e.target.category.value,
        done: false,
        createAt: new Date().getTime()
      }
      document.querySelector('.notice').innerHTML ="task added successfully";
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      e.target.reset();
      DisplayTodos();
      let msg = "Task added successfully";
      MyNotification(msg);
    }
  })
  DisplayTodos();
})
function EditData(e){
  console.log(e.target.childNodes[5].value);
  // console.log(e.target.childNodes[2]);
  let time = e.target.childNodes[5].value;
     let editable = (todos.find(item => item.createAt == time));
      editable.content = inputTodo.value;
      editable.category = e.target.category.value;
      
      localStorage.setItem('todos', JSON.stringify(todos));
   
      document.querySelector('.submit').value = 'Add To Do';
      document.querySelector('.submit').setAttribute('name','submit');
      inputTodo.value = '';
      e.target.childNodes[5].value = '';
      // let categoryEdit = e.target.childNodes[9].childNodes[1].childNodes[3].classList[1];
      // if(categoryEdit == 'personal'){
      //   document.querySelector('#category2').checked = true;
      // }else{
      //   document.querySelector('#category1').checked = true;
      // }
      DisplayTodos();
      let msg = 'task edited successfully'
      MyNotification(msg);
    // })
}
function MyNotification(msg){
  let notice =  document.querySelector('.notice');
  console.log(notice.classList);
  notice.innerHTML = msg;
  setTimeout(function(){ 
    notice.innerHTML = '';
  }, 2000)
}
function DisplayTodos() {
  const todoList = document.querySelector('#paginated-list');

  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const id = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.type = 'text';
    input.checked = todo.done;
    span.classList.add('bubble');

    if(todo.category == 'personal'){
      span.classList.add('personal');
    }else{
      span.classList.add('business');
    }

    content.classList.add('todo-content');
    id.classList.add('id');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    content.innerHTML =  `<input type="text" value= "${todo.content}" readonly>`;
    id.innerHTML =  `<input type="number" value= "${todo.createAt}" readonly>`;
    edit.innerHTML = 'Edit';
    deleteButton.innerHTML = 'Delete';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
		todoItem.appendChild(content);
    todoItem.appendChild(id);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})
		edit.addEventListener('click', (e) => {
      
      let time = (e.target.parentElement.parentElement.childNodes[2].childNodes[0].value);
      inputTodo.value = e.target.parentElement.parentElement.childNodes[1].childNodes[0].value;
      document.querySelector('.timeCreatedOn').value = time;

      let categoryEdit = e.target.parentElement.parentElement.childNodes[0].childNodes[1].classList[1]
      console.log(e.target.parentElement.parentElement.childNodes[0].childNodes[1]);
      if(categoryEdit == 'personal'){
        document.querySelector('#category2').checked = true;
      }else{
        document.querySelector('#category1').checked = true;
      }
      document.querySelector('.submit').value = 'Edit';
      document.querySelector('.submit').innerHTML = 'Edit';
      document.querySelector('.submit').setAttribute('name','Edit');
     
      // if(document.querySelector('.submit').name == 'Edit'){
      //   let newForm = document.getElementById('todo-form');
      //   newForm.addEventListener('submit', (e) => {
      //   //  todos.forEach(newfn);
      //    let editable = (todos.find(item => item.createAt == time));
      //     editable.content = "hey";
      //     editable.category = "business";

      //     console.log(editable);
      //     document.querySelector('.submit').value = 'Add To Do';
      //     document.querySelector('.submit').setAttribute('name','submit');
      //   })
      // }
				todo.content =  inputTodo.value; 
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
       
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos();
      let deleteMsg = "task deleted successfully";
      MyNotification(deleteMsg);
		})
  })
};

// pagination 
todos = JSON.parse(localStorage.getItem('todos'))
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.childNodes;
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

console.log(todos.length);

const paginationLimit = 2;
const pageCount = Math.ceil(todos.length / paginationLimit);
let currentPage;

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

window.addEventListener("load", () => {
  getPaginationNumbers();
});

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  todos.forEach((item, index) => {
    elementContainer.innerHTML = ''
    if (index >= prevRange && index < currRange) {
      elementContainer.appendChild(item)
    }
  });
};
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);
});
// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;
  
//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;
//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });
// };

// jsonData.forEach((item, index) => {
//   elementContainer.innerHTML = ''
//   if (index >= prevRange && index < currRange) {
//     elementContainer.appendChild(item)
//   }
// });

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);
// });

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });