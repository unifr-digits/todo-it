import {User} from "./user";

class ToDoApp {
    user: User;
    constructor() {
        this.user = new User("David", "Gauch", "DavidGauc", "david@example.com", "securepassword123");
    }
    start_test(): void {
        this.user.logIn("DavidGauc", "securepassword123");
        this.user.createToDo(
            "Buy t-shirt",
            "I need a black tshirt from H&M",
            1,
            new Date(2023, 19, 3),
            [""],
            false
        );
        this.user.createToDo(
            "sysdev assignment 2",
            "finish assignment 2 for sysdev course",
            2,
            new Date(2023, 28, 3),
            [""],
            false
        );
        this.user.createToDo(
            "workout",
            "20 min. running session",
            3,
            new Date(2023, 19, 3),
            [""],
            false
        );
    }
}

let app = new ToDoApp();
app.start_test();
