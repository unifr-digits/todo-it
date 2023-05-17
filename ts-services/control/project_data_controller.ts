import { ITask } from "../model/itask";
import { Task } from "../model/task";
import { IUser } from "../model/iuser";
import { DataAccessController } from "./data_access_controller";
import { IProject } from "../model/iproject";
import { Project } from "../model/project";

export class ProjectDataController extends DataAccessController {

    static async insertProject(user_id: number, project: IProject) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "INSERT INTO projects (project_id, name, user_id) VALUES ($1, $2, $3)",
            [project.project_id, project.name, user_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }

    static async selectProjects(user_id: number) : Promise<IProject[]> {
        let projects: Project[] = [];
        let results = await DataAccessController.pool.query(
            "SELECT project_id, name FROM projects WHERE user_id = $1",
            // depending on data volume, only id or e.g. name column should be selected
            [user_id]
        );
        // return result, ID is unique
        if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
            for (let row of results.rows) {
                let project = new Project();
                project.project_id = row.project_id;
                project.name = row.name;
                projects.push(project);
            }
            return projects;
        }
        throw new Error("No projects for user found");
    }

    static async selectProject(user_id: number, project_id: string) : Promise<IProject> {
        let results = await DataAccessController.pool.query(
            "SELECT project_id, name FROM projects WHERE user_id = $1 and id = $2",
            [user_id, project_id]
        );
        // return result, ID is unique
        if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
            let project = new Project();
            project.project_id = results.rows[0].project_id;
            project.name = results.rows[0].name;
            return project;
        }
        throw new Error("project not found");
    }
    
    static async updateProject(user_id: number, project: IProject) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "UPDATE projects SET name = $1 WHERE user_id = $2 and project_id = $3",
            [project.name, user_id, project.project_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }

    static async deleteProject(user_id: number, project_id: string) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "DELETE FROM projects WHERE user_id = $1 and project_id = $2",
            [user_id, project_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }
}
