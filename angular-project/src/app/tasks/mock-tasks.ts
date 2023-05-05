import { Task } from './task';

export const TASKS: Task[] = [
  {
    id: 1,
    name: 'Buy t-shirt',
    desc: 'I need a black tshirt from H&M ',
    date: '2023-01-10',
    modules: [''],
    done: true,
    assignedUsers: [],
    assignedProjects: [],
  },
  {
    id: 2,
    name: 'sysdev assignment 2',
    desc: 'finish assignment 2 for sysdev course',
    date: '2023-04-06',
    modules: [''],
    done: false,
    assignedUsers: [],
    assignedProjects: [],
  },
  {
    id: 3,
    name: 'workout',
    desc: '20 min running session',
    date: '2023-01-10',
    modules: [''],
    done: false,
    assignedUsers: [],
    assignedProjects: [],
  },
];
