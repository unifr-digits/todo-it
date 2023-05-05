import { Project } from './project';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Project 1',
    desc: 'This is the description of Project 1',
    modules: ['Module 1', 'Module 2'],
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        desc: 'This is the description of Task 1',
        date: '2023-03-03',
        modules: [''],
        done: false,
        assignedUsers: [],
        assignedProjects: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Project 2',
    desc: 'This is the description of Project 2',
    modules: ['Module 1', 'Module 2'],
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        desc: 'This is the description of Task 1',
        date: '2023-03-03',
        modules: [''],
        done: false,
        assignedUsers: [],
        assignedProjects: [],
      },
    ],
  },
];
