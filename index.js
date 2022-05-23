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
                updateEmpRole();
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
        console.log('\n');
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
        console.log('\n');
        console.table(rows);
        actionPrompt();
    })
};

const viewEmployees = () => {
    const sql = `SELECT 
    employees.id,
    CONCAT(employees.first_name, ' ', employees.last_name) AS 'name',
    departments.name AS 'department',
    roles.title,
    roles.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager'
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id
    ORDER BY employees.id;`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.table(rows);
        actionPrompt();
    })
};

const addDepartment = () => {
    inquirer.prompt(addDepartmentQuestion)
    .then(answer => {
        const sql = 'INSERT INTO departments (name) VALUES (?)';
        const params = [answer.departmentName];
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log(`The ${answer.departmentName} department has been added to the database`);
            actionPrompt();
        })
    })
};

const addRole = () => {
    inquirer.prompt(addRoleQuestions)
    .then(answers => {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        const params = [answers.roleName, answers.salary, answers.departmentId];
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log(`The ${answers.roleName} role has been added to the database`);
            actionPrompt();
        })
    })
};

const addEmployee = () => {
    inquirer.prompt(addEmployeeQuestions)
    .then(answers => {
        const sql = `INSERT INTO
        employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        const params = [answers.empFirstName, answers.empLastName, answers.empRoleId, answers.empManagerId];
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log(`${answers.empFirstName} ${answers.empLastName} has been added to the database`);
            actionPrompt();
        })
    })
};

const updateEmpRole = () => {
    const empChoicesArr = [];
    const roleChoicesArr = [];
    const empsql = `SELECT CONCAT (employees.first_name, ' ', employees.last_name) AS employee FROM employees`;
    const rolesql = `SELECT title FROM roles`;
    db.query(empsql, (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            empChoicesArr.push(rows[i].employee)
        }
        db.query(rolesql, (err, rows) => {
            if (err) throw err;
            for (let i = 0; i < rows.length; i++) {
                roleChoicesArr.push(rows[i].title)
            }
            inquirer.prompt([
                {
                    message: "Which employee's role would you like to change?",
                    type: 'list',
                    name: 'empName',
                    choices: empChoicesArr
                },
                {
                    message: 'What is the new role of the employee?',
                    type: 'list',
                    name: 'newRole',
                    choices: roleChoicesArr
                }
            ])
            .then(answers => {
                let empRoleId;
                let empNameArr = answers.empName.split(' ');
                const roleIdSql = `SELECT id FROM roles WHERE title = '${answers.newRole}'`
                db.query(roleIdSql, (err, rows) => {
                    if (err) throw err;
                    empRoleId = rows[0].id
                    const updateSql = `UPDATE employees
                    SET role_id = ${empRoleId}
                    WHERE first_name= '${empNameArr[0]}' AND last_name= '${empNameArr[1]}';`
                    db.query(updateSql, (err, rows) => {
                        if (err) throw err;
                        console.log(`${empNameArr[0]} ${empNameArr[1]}'s role has been updated`)
                        actionPrompt();
                    })
                })
            })
        })
    }) 
};

