// theme changer
const themebtn = document.querySelectorAll('.dropdown-item');

themebtn.forEach(btn => btn.addEventListener("click", changeTheme));
// global var drag drop
let draggedItem = null;
// Drag & drop for todo items (delegated handlers)
document.addEventListener("dragstart", (e) => {
    const item = e.target.closest(".todo-item");
    if (!item) return;
    draggedItem = item;
    item.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", ""); } catch {}
});

document.addEventListener("dragend", () => {
    if (draggedItem) {
        draggedItem.classList.remove("dragging");
        draggedItem = null;
        document.querySelectorAll(".task-list").forEach(updateProgressForList);
    }
});

document.addEventListener("dragover", (e) => {
    const list = e.target.closest(".task-list");
    if (!list) return;
    e.preventDefault(); // allow drop
    const after = getDragAfterElement(list, e.clientY);
    if (!draggedItem) return;
    if (after == null) {
        list.appendChild(draggedItem);
    } else {
        list.insertBefore(draggedItem, after);
    }
});

document.addEventListener("drop", (e) => {
    const list = e.target.closest(".task-list");
    if (!list) return;
    e.preventDefault();
    // ensure item is in the list after drop
    if (draggedItem && draggedItem.parentNode !== list) {
        list.appendChild(draggedItem);
    }
    document.querySelectorAll(".task-list").forEach(updateProgressForList);
});

// helper to find insertion point
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".todo-item:not(.dragging)")];
    let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
    for (const child of draggableElements) {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            closest = { offset, element: child };
        }
    }
    return closest.element;
}

// update progress bar for one task-list
function updateProgressForList(list) {
    const todoItems = list.querySelectorAll(".todo-item");
    const total = todoItems.length;
    let done = 0;
    todoItems.forEach(item => {
        const circle = item.querySelector(".circle");
        if (circle && circle.classList.contains("checked")) done++;
    });
    const percentage = total === 0 ? 0 : (done / total) * 100;
    const percentBar = list.closest(".todo-column")?.querySelector(".progress-bar");
    if (percentBar) percentBar.style.width = percentage + "%";
}

function changeTheme(event) {

    document.body.classList.remove("theme-rainbow", "theme-light", "theme-dark", "theme-glass");

    const newTheme = event.target.dataset.theme;
    document.body.classList.add(newTheme);
}
console.log(changeTheme);

// todo list adder
const todobtn = document.getElementById("addColumnBtn")
todobtn.addEventListener("click", addtodo)
let columnCount = 1;

function addtodo() {
    columnCount++;
    const newColumn = document.createElement("div");
    newColumn.dataset.columnId = columnCount;
    console.log(columnCount);

    newColumn.classList.add("todo-column");
    newColumn.innerHTML = `    <div class="col-header">
                        <div class="col-title" id="To-do-Title">To do</div>
                        <div class="col-actions">
                            <button class="btn btn-sm  btn-remove-col" title="Remove column"><i
                                    class="bi bi-x"></i></button>
                        </div>


                    </div>
                    <div class="progress-bar-container mb-3">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="task-list" data-list-id="1">
                        <div class="todo-item justify-content-between" draggable="true" data-list-id="1">
                            <div class="d-flex gap-1">
                                <span class="circle"></span>
                                <span class="task-text ">Sample task</span>
                            </div>


                            <div>
                                <button class="btn-edit-task">✏️</button>
                                <button class="btn-remove-task">🗑️</button>
                            </div>

                        </div>
                    </div>

                    <!-- Add task input (JS hook: .task-input) -->
                    <div class="mt-2 d-flex gap-2">
                        <input class="form-control form-control-sm task-input" placeholder="Add task...">
                        <button class="btn btn-sm btn-primary btn-add-task">Add</button>
                    </div>
                </div>`;
    const wrapper = document.getElementById("columnsWrapper");
    wrapper.appendChild(newColumn);

}
let taskCount = 1;
const wrapper = document.getElementById("columnsWrapper");

// main listeners
wrapper.addEventListener("click", handleClick);
wrapper.addEventListener("keydown", handleKeyDown); // ✅ new listener for enter key

function handleClick(event) {
    // remove column
    const removeBtn = event.target.closest('.btn-remove-col');
    if (removeBtn) {
        const column = removeBtn.closest('.todo-column');
        if (column) column.remove();
    }

    // edit column title
    const title = event.target.closest('.col-title');
    if (title) {
        const renameInput = document.createElement("input");
        renameInput.value = title.textContent;
        title.parentNode.replaceChild(renameInput, title);
        renameInput.focus();

        renameInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") finishEdit();
        });

        renameInput.addEventListener("blur", finishEdit);

        function finishEdit() {
            const newTitle = renameInput.value.trim() || "To do";
            const newTitleDiv = document.createElement("div");
            newTitleDiv.className = "col-title";
            newTitleDiv.textContent = newTitle;
            renameInput.parentNode.replaceChild(newTitleDiv, renameInput);
        }
    }

    // add task on add button click
    const addBtn = event.target.closest(".btn-add-task");
    if (addBtn) {
        const input = addBtn.previousElementSibling;
        if (!input || input.value.trim() === "") return;
        addTask(input, addBtn);
    }
    // ✅ remove task
    const removeTaskBtn = event.target.closest(".btn-remove-task");
    if (removeTaskBtn) {
        const taskItem = removeTaskBtn.closest(".todo-item");
        if (taskItem) taskItem.remove();
    }

    // ✅ edit task
    const editTaskBtn = event.target.closest(".btn-edit-task");
    if (editTaskBtn) {
        const taskItem = editTaskBtn.closest(".todo-item");
        const taskText = taskItem.querySelector(".task-text");

        // make it editable
        taskText.contentEditable = "true";
        taskText.classList.add("editing");
        taskText.focus();

        // when user presses Enter or clicks away
        const finishEdit = () => {
            taskText.contentEditable = "false";
            taskText.classList.remove("editing");
            taskText.textContent = taskText.textContent.trim() || "Untitled task";
        };

        taskText.addEventListener("blur", finishEdit, { once: true });
        taskText.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); // stop new line
                finishEdit();
            }
        });
    }
    // toggle complete 
    const clickedItem = event.target.closest('.todo-item');
    if (clickedItem) {
        if (event.target.closest('.btn-edit-task') || event.target.closest('.btn-remove-task')) {
            // do nothing here 
        } else {
            const circle = clickedItem.querySelector('.circle');
            const text = clickedItem.querySelector('.task-text');

            const nowChecked = circle.classList.toggle('checked');
            text.classList.toggle('checked', nowChecked);

            clickedItem.dataset.completed = nowChecked ? "true" : "false";
        }
    }
    // progress bar
    if (clickedItem) {
        const parentList = clickedItem.closest(".task-list");
        const todoItems = parentList.querySelectorAll(".todo-item");
        const totalTasks = todoItems.length;
        let doneTasks = 0;
        todoItems.forEach(item => {
            const circle = item.querySelector('.circle');
            if (circle && circle.classList.contains('checked')) {
                doneTasks++;
            }
        });
        const percentage = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;
        const percentBar = parentList.closest(".todo-column").querySelector(".progress-bar");
        percentBar.style.width = percentage + "%";
    }


}




function handleKeyDown(event) {
    const inputField = event.target.closest(".task-input");
    if (inputField && event.key === "Enter" && inputField.value.trim() !== "") {
        const addBtn = inputField.nextElementSibling;
        addTask(inputField, addBtn);
    }
}

function addTask(input, addBtn) {
    const taskList = addBtn.closest(".todo-column").querySelector(".task-list");
    const newTask = document.createElement("div");
    newTask.className = "todo-item";
    newTask.classList.add("justify-content-between");
    newTask.setAttribute("draggable", "true");
    newTask.dataset.listId = taskCount++;
    newTask.innerHTML = `
       
                            <div class="d-flex gap-1">
                                <span class="circle"></span>
                                <span class="task-text ">${input.value.trim()}</span>
                            </div>


                            <div>
                                <button class="btn-edit-task">✏️</button>
                                <button class="btn-remove-task">🗑️</button>
                            </div>

                        `;
    taskList.appendChild(newTask);
    input.value = "";
    console.log(newTask);
    
}


