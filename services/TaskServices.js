import {BaseService} from "./BaseSevice.js"
export class TaskServices{
    constructor(){
        super();
    }

    getAllTask = () => {
        return this.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask"); 
    }

    // Định nghia hàm đưa dữ liệu về backend 
    addTask = (task) =>{ 
        return this.post("http://svcy.myclass.vn/api/ToDoList/AddTask",task)
    }

    deleteTask = (taskName) => {
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`)  
    }

    putTask = (task) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${task}`)
    }

    recheck = (task) => {
        return this.put( `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${task}`)
      
    }
}