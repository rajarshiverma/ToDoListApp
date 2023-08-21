const plusBtn=document.querySelector(".add-button");
const inputText=document.getElementById("text-input");
const taskList= document.querySelector(".task-list");
const tasksCounter= document.getElementById("tasks-counter");

let tasks;


//for displaying alert as notification
const showNotification= (text)=>{
    alert(text);
}

inputText.addEventListener("keydown", function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call the addTask function to add the task
        addTask();
    }
});
//for toggling the between checked out task
const toggleIcon= (e)=>{
    let nextElClassList=e.target.nextElementSibling.classList;
    let classList = e.target.classList;

    if (classList.contains("circle-icon")) {
        classList.remove("circle-icon");
        classList.add("circle-icon-check");
        nextElClassList.add("done");
      } else {
        classList.add("circle-icon");
        classList.remove("circle-icon-check");
        nextElClassList.remove("done");
      }
}

//adding task from input box
const addTask=()=>{
    let task=inputText.value;
    console.log(task);
    if (!task){
        showNotification("Task cannot be empty");
        return;
    }
    tasks=get();
    if (!tasks) tasks=[];

    tasks.push({
        task,
        status:"pending",
    });
    showNotification("Task added");
    save(tasks);

    showTaskList();
    inputText.value="";
}

//adding and removing task from tasklist 
const showTaskList=()=>{
    tasks=[];
    tasks=get();
    taskList.innerHTML="";
    if (tasks){
        createLiTag(tasks);
        tasksCounter.innerHTML=tasks.length;
    }    
}


//creating new li tag list if new task is added to tasklist
const createLiTag=(tasks)=>{
    tasks.forEach((taskInfo,index) => {
        const {task,status}=taskInfo;
        let iconClass =
            taskInfo.status === "pending" ? "circle-icon" : "circle-icon-check";
        let textClass=taskInfo.status==="pending"?"":"done";
        
        let liTag=document.createElement("li");
        //html li component of the task
        liTag.innerHTML=`
        <li class="task">
            <span>
                <span class="custom-icon ${iconClass}" onclick="toggleIcon(event); updateTaskStatus(${index})"></span>
                <span class="text ${textClass}">${task}</span>
            </span>
            <span class="trash-icon" onclick="removeTask(${index})">&#x1F5D1;</span>            
        </li>
        `;
        taskList.append(liTag);
    });
}

//if changes are made in task then updating it
const updateTaskStatus=(index)=>{
    let status=tasks[index].status;

    //if status is pending then change to complete otherwise change it to done
    status=="pending"?(status="done"):(status="pending");
    tasks[index].status=status;
    showNotification("Task status changed");
    save(tasks);
}

//removing task from task list
const removeTask=(index)=>{
    tasks.splice(index,1);
    showNotification("Task Deleted");
    save(tasks);
    showTaskList();
}

const save=(data)=>localStorage.setItem("tasks",JSON.stringify(data));
const get=()=>JSON.parse(localStorage.getItem("tasks"));

showTaskList();