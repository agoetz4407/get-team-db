const actionQuestion = [
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
            'Quit Application'
        ]
    }
];

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department to add?'
    }
];

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
    },
    {
        type: 'number',
        name: 'salary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'number',
        name: 'departmentId',
        message: 'What is the id number of the department the role belongs to?',
    }
];

const addEmployeeQuestions = [
    {
        message: 'What is the first name of the new employee?',
        type: 'input',
        name: 'empFirstName',
    },
    {
        message: 'What is the last name of the new employee?',
        type: 'input',
        name: 'empLastName',
    },
    {
        message: 'What is the ID number of the role for the new employee?',
        type: 'number',
        name: 'empRoleId',
    },
    {
        message: 'What is the employee ID number of the manager for the new employee (enter 0 for none)?',
        type: 'number',
        name: 'empManagerId',
    }
];

const updateRoleQuestions = [
    {
        message: "Which employee's role would you like to change?",
        type: 'list',
        name: 'empName',
        choices: 'placeholder'//TODO: add variable array here with DB
    },
    {
        message: 'What is the new role of the employee?',
        type: 'list',
        name: 'newRole',
        choices: 'placeholder'//TODO: add variable array here with DB
    }
]

module.exports = {
    actionQuestion,
    addDepartmentQuestion,
    addRoleQuestions,
    addEmployeeQuestions
}