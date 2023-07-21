window.addEventListener("load", () => {
//  get data from locat storage if there isn't any set todos  empty 
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector(".name"); // name input value
  newTodoForm = document.getElementById("todo-form"); // form value
  inputTodo = document.querySelector(".content"); // task value
  inputCatogery = document.getElementsByClassName("options"); // know catogery of task
  const username = localStorage.getItem("username") || ""; //get username value
  nameInput.value = username; //set username value to loalstorage

  // set new value of name if user changes name 
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  // listen form form submit 
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    buttonType = e.target.childNodes[11].name; // get button type is it for edit or to add
    // if button type is edit thancall edit function
    if (buttonType == "Edit") {
      EditData(e);
    }
    // check if task value and category is provided
     else if (e.target.content.value == "" || e.target.category.value == "") {
      let msg = "Please fill out task todo as well as category";
      if (e.target.content.value == "") {
        msg = "Please fill out task  todo";
      }
      if (e.target.category.value == "") {
        msg = "Please fill out category of task todo";
      }
      // send message 
      let myClass = "normal"
      MyNotification(msg, myClass);
    }
    // if button type is submit and all entry is provided then add task
     else {
      // ceacting array to store value provided 
        const todo = {
          content: e.target.content.value,
          category: e.target.category.value,
          done: false,
          createAt: new Date().getTime(),
        };
        todos.push(todo); //push array in todos
        localStorage.setItem("todos", JSON.stringify(todos)); //set new task in localstorage
        e.target.reset(); //reset input fields
        getPaginationNumbers(); 
        DisplayTodos(0,3);
        myFunction();
        pageCount = Math.ceil(todos.length /  paginationLimit);
        let msg = "Task added successfully";
        let myClass = "created"
        handlePageButtonsStatus();
        handleActivePageNumber();
        MyNotification(msg, myClass);
    } 
  });
  DisplayTodos();
});

// function to edit data 
function EditData(e) {
  let time = e.target.childNodes[5].value; // get value of id
  let editable = todos.find((item) => item.createAt == time); //get element from localstorage
  editable.content = inputTodo.value; // edit task  
  editable.category = e.target.category.value; //edit task category

  // set edited data to localsorage 
  localStorage.setItem("todos", JSON.stringify(todos));
  // change button attribute and value after editing data 
  document.querySelector(".submit").value = "Add To Do";
  document.querySelector(".submit").setAttribute("name", "submit");
  e.target.reset(); //reset input values 
  let activeClass = document.querySelector('#pagination-numbers .active').attributes[1].value;
  // typeOf(activeClass);
  setCurrentPage(parseInt(activeClass));
  let msg = "task edited successfully";
  myClass = "edited"
  MyNotification(msg, myClass);
}

// display tasks from localstorage 
function DisplayTodos(prevRange, currentRange) {
  // get pagination numbers 
  const todoList = document.querySelector("#paginated-list");
  todoList.innerHTML = ""; //set pagination number to null
  // check if input is null 
  if (todos.length == 0){
    todoList.innerHTML = "ToDo List is empty please enter task to do";
  }
  else {
    todos.forEach((item, index) => {
      if(index == undefined){
      }
      if (index >= prevRange && index < currentRange) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const actions = document.createElement("div");
        const id = document.createElement("div");
        const edit = document.createElement("button");
        const deleteButton = document.createElement("button");
      
        input.type = "text";
        input.checked = item.done;
        span.classList.add("bubble");
      
        if (item.category == "personal") {
          span.classList.add("personal");
        } else {
          span.classList.add("business");
        }
      
        content.classList.add("todo-content");
        id.classList.add("id");
        actions.classList.add("actions");
        edit.classList.add("edit");
        deleteButton.classList.add("delete");
      
        content.innerHTML = `<input type="text" value= "${item.content}" readonly>`;
        id.innerHTML = `<input type="number" value= "${item.createAt}" readonly>`;
        edit.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
      
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(id);
        todoItem.appendChild(actions);
      
        todoList.appendChild(todoItem);
      
        if (item.done) {
          todoItem.classList.add("done");
        }
      
        input.addEventListener("change", (e) => {
          item.done = e.target.checked;
          localStorage.setItem("todos", JSON.stringify(todos));
        
          if (item.done) {
            todoItem.classList.add("done");
          } else {
            todoItem.classList.remove("done");
          }
          DisplayTodos();
        });
        edit.addEventListener("click", (e) => {
        let time =
          e.target.parentElement.parentElement.childNodes[2].childNodes[0].value;
        inputTodo.value =
          e.target.parentElement.parentElement.childNodes[1].childNodes[0].value;
        document.querySelector(".timeCreatedOn").value = time;

        let categoryEdit =
          e.target.parentElement.parentElement.childNodes[0].childNodes[1]
            .classList[1];

        if (categoryEdit == "personal") {
          document.querySelector("#category2").checked = true;
        } else {
          document.querySelector("#category1").checked = true;
        }
        document.querySelector(".submit").value = "Edit";
        document.querySelector(".submit").innerHTML = "Edit";
        document.querySelector(".submit").setAttribute("name", "Edit");
        todo.content = inputTodo.value;
        localStorage.setItem("todos", JSON.stringify(todos));

        DisplayTodos();
      });

      deleteButton.addEventListener("click", (e) => {

        warning = "Are you sure you want to delete"

        if(confirm(warning) == true){
          todos = todos.filter((t) => t != item);
          localStorage.setItem("todos", JSON.stringify(todos));
          DisplayTodos(prevRange, currentRange);
          let deleteMsg = "task deleted successfully";
          let myClass = "deleted";
          pageCount = Math.ceil(todos.length /  paginationLimit);
          MyNotification(deleteMsg, myClass);
          setCurrentPage(1);
          getPaginationNumbers();
          myFunction(currentPage);
          handleActivePageNumber();
        }
      });
      }
    })
  }
}

// pagination

todos = JSON.parse(localStorage.getItem("todos"));
const todoList = document.querySelector("#paginated-list");

const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.childNodes;
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");


const paginationLimit = 5;
let pageCount = Math.ceil(todos.length / paginationLimit);
let currentPage;

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = "";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};
const getPaginationNumbers = () => {
  document.querySelector("#pagination-numbers").innerHTML = '';
  let myPage = Math.ceil(todos.length / paginationLimit);
  for (let i = 1; i <= myPage; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
  let queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing page value
  queryParams.set('page', currentPage);
  // Replace current querystring with the new one
  history.replaceState(null, null, "?" + queryParams.toString());
  DisplayTodos(prevRange, currRange);
};

window.addEventListener("load", myFunction);
function myFunction(){
 
  getPaginationNumbers();

  let queryParams = new URLSearchParams(window.location.search); //get link
  const product = (queryParams.get('page')); // get page number from link 

  // if user provide page number in link redirect to that page 
  if(product <= pageCount){
    setCurrentPage(product);
  // else redirect to front page 
  }else{
    setCurrentPage(1);
  }
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
};
window.addEventListener('load', () => {
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });
  nextButton.addEventListener("click", () => {
   if(typeof(currentPage) == "string") {
    currentPage =  parseInt(currentPage);
   }
    setCurrentPage(currentPage + 1);
  });
})

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }1
};
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");

    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

function searchItem(value){
  if(value){
    document.querySelector('.pagination-container').style.display= "none";
  }else{
    document.querySelector('.pagination-container').style.display= "";
  }
    let items = document.querySelector('#paginated-list');
    let itemList = items.getElementsByClassName('todo-item');
    for(let j=0; j<itemList.length; j++)
    {
      let contentValue = itemList[j].getElementsByTagName("input")[1].value
      // console.log(itemList[j].getElementsByTagName("input")[1].value);
      // console.log(contentValue.toUpperCase().indexOf(value.toUpperCase()))
      if(contentValue.toUpperCase().indexOf(value.toUpperCase()) > -1){
        itemList[j].style.display = "none";
      }else{
        itemList[j].style.display = "";
      }
    }
    // console.log(item);
  }

// set message 
function MyNotification(msg,myClass) {
  let notice = document.querySelector(".notice");
  notice.classList.add(myClass);
  notice.innerHTML = msg;
  setTimeout(function () {
    notice.innerHTML = "";
    notice.classList.remove(myClass);
  }, 2000);
}