INSERT INTO department(department_name)
VALUES ("Accounting"),
       ("Engineer"),
       ("HR"),
       ("Legal"),
       ("Sales"),
       ("Service");

INSERT INTO employee_role(title, salary, department_id)
VALUES ("Accountant", 90000, 1),
       ("Lead Engineer", 130000, 2),
       ("Legal Lead", 80000, 4),
       ("Legal Advisor", 100000, 4),
       ("Sales Manager", 80000, 5),
       ("Sales Associate", 50000, 5),
       ("Customer Representative", 40000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("James", "Smith", 5, null),
       ("Maria", "Garcia", 6, 1),
       ("William", "Johnson", 6, 1),
       ("Sarah", "Jones", 2, null),
       ("George", "Lopez", 3, null),
       ("Robert", "Martinez", 4, 5),
       ("Jason", "Chan", 4, 5);