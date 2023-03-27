import {User} from "./user";

let dc = new User("David", "Gauch", "DavidGauc", "david@example.com", "securepassword123");
dc.logIn("DavidGauc", "securepassword123");
dc.createToDo(
    "Buy t-shirt",
    "I need a black tshirt from H&M",
    1,
    new Date(2023, 19, 3),
    [""],
    false
);
dc.createToDo(
    "sysdev assignment 2",
    "finish assignment 2 for sysdev course",
    2,
    new Date(2023, 28, 3),
    [""],
    false
);
dc.createToDo("workout", "20 min. running session", 3, new Date(2023, 19, 3), [""], false);
