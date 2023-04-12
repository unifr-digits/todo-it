
export class Task {
    name: string;
    desc: string;
    id: number;
    date: string;
    modules: string[];
    done: boolean;

    constructor(
        name: string,
        desc: string,
        id: number,
        date: string,
        modules: string[],
        done: boolean
    ) {
        this.name = name;
        this.desc = desc;
        this.id = 1;
        this.date = date;
        this.modules = modules;
        this.done = done;
    }
}