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
};

const viewDepartments = () => {
    const sql = 'SELECT * FROM departments'
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        actionPrompt();
    })
};

const viewRoles = () => {
    const sql = `SELECT 
    roles.id,
    roles.title,
    roles.salary,
    departments.name AS 'department'
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        actionPrompt();
    })
};

const viewEmployees = () => {};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateRole = () => {};

