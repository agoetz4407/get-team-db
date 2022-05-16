const inquirer = require('inquirer');
const db = require('./db/connection');

const intialQuestions = inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            "Update an employee's role",
            "Update an employee's manager",
            'View employees by manager',
            'View employees by department',
            'Delete a department, role, or employee',
            'View total utilized budget of a department'
        ]
    }
]);

const addDepartmentQuestions = inquirer.prompt([
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('\nPlease enter a name for the department')
                return false;
            }
        }
    }
]);

//TODO: fix DB query to get departments
const addRoleQuestions = db.query()
.then(inquirer.prompt([
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('\nPlease enter a name for the role')
                return false;
            }
        }
    },
    {
        type: 'number',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: input => {
            if (input && typeof input == 'number') {
                return true;
            } else {
                console.log('\nPlease enter a salary for the role (only numbers with optional decimal place, no commas or symbols)')
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: [
        ]
    }
]));