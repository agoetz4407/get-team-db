USE get_team_db;

INSERT INTO departments (name)
VALUES 
    ('Leadership'),
    ('Finance'),
    ('Sales'),
    ('Development'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES   
    ('Chief Executive Officer', 300000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Sales Lead', 90000, 3),
    ('Sales Associate', 75000, 3),
    ('Senior Developer', 250000, 4),
    ('Junior Developer', 110000, 4),
    ('Lawyer', 220000, 5),
    ('Paralegal', 80000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Andrew', 'Ryan', 1, NULL),
    ('Daniel', 'Price', 2, 1),
    ('Martha', 'Count', 3, 2),
    ('Amy', 'Sold', 4, 1),
    ('Anthony', 'Sell', 5, 4),
    ('Josh', 'Dell', 6, 1),
    ('Emily', 'Post', 7, 6),
    ('Jamie', 'Jones', 8, 1),
    ('Matthew', 'Smith', 9, 8);
    

