import { ITeam } from "../model/iteam";
import { Team } from "../model/team";

import { DataAccessController } from "./data_access_controller";

export class TeamDataController extends DataAccessController {

    static async insertTeam(user_id: number, team: ITeam) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "INSERT INTO teams (team_id, name, description, user_id) VALUES ($1, $2, $3, $4)",
            [team.team_id, team.name, team.description, user_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }

    static async selectTeams(user_id: number) : Promise<ITeam[]> {
        let teams: Team[] = [];
        let results = await DataAccessController.pool.query(
            "SELECT team_id, name, description FROM teams WHERE user_id = $1",
            // depending on data volume, only id or e.g. name column should be selected
            [user_id]
        );
        // return result, ID is unique
        if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
            for (let row of results.rows) {
                let team = new Team();
                team.team_id = row.team_id;
                team.name = row.name;
                team.description = row.description;
                teams.push(team);
            }
            return teams;
        }
        throw new Error("No teams for user found");
    }

    static async selectTeam(user_id: number, team_id: string) : Promise<ITeam> {
        let results = await DataAccessController.pool.query(
            "SELECT team_id, name, description FROM teams WHERE user_id = $1 and id = $2",
            [user_id, team_id]
        );
        // return result, ID is unique
        if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
            let team = new Team();
            team.team_id = results.rows[0].team_id;
            team.name = results.rows[0].name;
            team.description = results.rows[0].description;
            return team;
        }
        throw new Error("team not found");
    }
    
    static async updateTeam(user_id: number, team: ITeam) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "UPDATE teams SET name = $1, description = $2 WHERE user_id = $3 and team_id = $4",
            [team.name, team.description, user_id, team.team_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }

    static async deleteTeam(user_id: number, team_id: string) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "DELETE FROM teams WHERE user_id = $1 and team_id = $2",
            [user_id, team_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }
}
