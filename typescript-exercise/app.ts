import { User } from "./user";

class ToDoApp{
    user:User;
    constructor(){
        this.user = new User()
    }
    start_test(): void{
        this.user.logIn("David","123hello");
        this.user.createToDo("buy tshirt","I need a black tshirt which I will buy in H&M",1,new Date(2023,19,3),[""],false);
        this.user.createToDo("homework","finish assignment 2 in sysdev course",2,new Date(2023,25,3),[""],false);
        this.user.createToDo("workout","20min running session",3,new Date(2023,19,3),[""],false);
    }
}

let app = new ToDoApp();
app.start_test();