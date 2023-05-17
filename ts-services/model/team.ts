import { ITeam } from "./iteam";

export class Team implements ITeam {

    team_id: string;
    name: string;
    description: string;
    user_id?: number;

    constructor() {
        this.team_id = "";
        this.name = "";
        this.description = "";
    }
}
