import { Project } from './project';

export const PROJECTS: Project[] = [
  {
    name: "Project 1",
    desc: "This is the description of Project 1",
    id: 1,
    modules: ["Module 1", "Module 2"],
    tasks: [
      {name: "Task 1", desc: "This is the description of Task 1", id: 1,date:"2023-03-03",modules:[""],done:false,assignedUsers:[], assignedProjects:[]}
    ]
  },
  {
    name: "Project 2",
    desc: "This is the description of Project 2",
    id: 1,
    modules: ["Module 1", "Module 2"],
    tasks: [
      {name: "Task 1", desc: "This is the description of Task 1", id: 1,date:"2023-03-03",modules:[""],done:false,assignedUsers:[], assignedProjects:[]}
    ]
  }
];


