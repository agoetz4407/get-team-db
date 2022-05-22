const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

//questions required in
const {
    actionQuestion,
    addDepartmentQuestion,
    addRoleQuestions,
    addEmployeeQuestions
} = require('./lib/prompts')


db.connect(err => {
    if(err) throw err;
    console.log('Database connected');
    actionPrompt();
})

const actionPrompt = () => {
    inquirer.prompt(actionQuestion)
    .then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case "Update an employee's role":
                updateRole();
                break;
            case 'Quit Application':
                db.end();
                break;
        }
    })
}

