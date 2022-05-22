USE get_team_db;

INSERT INTO departments (name)
VALUES 
    ('Finance'),
    ('Sales'),
    ('Development'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Account Manager', 160000, 1),
    ('Accountant', 125000, 1),
    ('Sales Lead', 90000, 2),
    ('Sales Associate', 75000, 2),
    ('Senior Developer', 250000, 3),
    ('Junior Developer', 110000, 3),
    ('Lawyer', 220000, 4),
    ('Paralegal', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Andrew', 'Price', 1, NULL),
    ('Martha', 'Count', 2, 1),
    ('Amy', 'Sold', 3, NULL),
    ('Anthony', 'Sell', 4, 3),
    ('Josh', 'Dell', 5, NULL),
    ('Emily', 'Post', 6, 5),
    ('Jamie', 'Jones', 7, NULL),
    ('Matthew', 'Smith', 8, 7);
    

