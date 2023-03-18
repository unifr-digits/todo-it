class User {
    firstName: string;
    lastName: string;
    userName: string;
    emailAdress: string;
    password: string;
    usedDevices: string[];

    constructor(){
        this.firstName = "John";
        this.lastName = "Stevens";
        this.userName = "JoStev";
        this.emailAdress = "john.stevens@hotmail.com";
        this.password = "hello123";
        this.usedDevices = ["smartphone","table"];
    }
    logIn(userName:string, password:string): void{
        this.userName = userName;
        this.password = password;
        console.log(`logged in as ${this.userName}`);
    }
    logOut(): void{
        console.log(`logged out`);
    }
    createToDo(): void{

    }
    completeToDo(): void{

    }
    createTeam(): void{

    }
    createProject(): void{

    }
    addModule(): void{

    }
    viewToDo(): void{

    }
    filterToDo(): void{

    }
}