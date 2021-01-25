import {TaskServices} from "../services/TaskServices.js";
import {Task} from "../models/Task.js"

const taskSV = new TaskServices();

const getAllTask = async() => {
    try{
        const result = await taskSV.getAllTask();
        console.log("Result data: " , result.data);

        let taskToDo = result.data.filter(task => task.status === false)
        console.log(taskToDo);
        randerTaskToDo(taskToDo);

        let taskCompleted = result.data.filter(task => task.status === true)
        console.log(taskCompleted);
        randerTaskCompleted(taskCompleted);
    }catch(err){
        console.log(error);
    }
}
const randerTaskToDo = (taskToDo) => {
    const content = taskToDo.reduce((content, item, index) =>{
        return content += `
            <li style = "display: flex; justify-content: space-between;">
                <div>${item.taskName}</div>
                <div>
                    <span class="button" style="cursor: pointer;" onclick = "putTask('${item.taskName}')"><i class="fa fa-check"  style="color:green"></i></span>
                    <span class="button" style="cursor: pointer;" onclick = "delTask('${item.taskName}')"><i class="fa fa-trash" style="color:red"></i></span>
                </div>
            </li>`
    },"")
    document.getElementById("todo").innerHTML = content;
}

const randerTaskCompleted = (taskCompleted) => {
    const content = taskCompleted.reduce((content, item, index) =>{
        return content += `
            <li>
                <p>${item.taskName}</p>
                <p>
                <span class="buttons" style="cursor: pointer;"onclick = "reCheck('${item.taskName}')"><i class="fa fa-undo" style="color:green"></i></span>
                    <span class="buttons" style="cursor: pointer";onclick = "delTask('${item.taskName}')"><i class="fa fa-trash"  style="color:red"></i></span>
                    
                </p>
            </li>`
    },"")
    document.getElementById("completed").innerHTML = content;
}
getAllTask();


//========================== Nghiep vu them task ====================>
// B1 Định nghĩa sự kiện click cho button #additem
document.getElementById("addItem").onclick = async (event)=>{
    // even.preventDefault(); // Chặn sư kiện hiện tại của thẻ submit hay thẻ href thẻ a
    // even.Target <= đại diện cho button đang được click
    // Lấy thông tin người dùng nhập từ giao diện
    let inputTaskName = document.getElementById("newTask").value;
    // Tạo ra object backend yêu cầu 
    const taskModel = new Task();
    taskModel.taskName =  inputTaskName;
    try{
        let result = await taskSV.addTask(taskModel);
        console.log("Đã thêm thành công" , result.data);
        getAllTask();
        // sau khi thêm thành công gọi hàm getAllTask để load lại list
    }catch(err){
        console.log(err);
    }
}


   
window.delTask = async (taskName) => {
    let cfm = confirm("Bạn có muốn xóa Task không");
    if(cfm){
        try{
            let result = await taskSV.deleteTask(taskName);
            console.log(result.data);
            getAllTask();
        }catch(err){
            console.log(err);
        }
    }
}

window.putTask = async (task) => {
        try{
            let result = await taskSV.putTask(task);
            console.log(result.data);
            getAllTask();
        }catch(err){
            console.log(err);
        }
}
window.reCheck = async (task) => {
    try{
        let result = await taskSV.recheck(task);
        console.log(result.data);
        getAllTask();
    }catch(err){
        console.log(err);
    }
}