const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "movies_db",
    },
    console.log(`Connected to the employee database.`)
);

function init() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'viewOptions',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }
    ])
    .then(answers => {
        switch(answers.viewOptions) {
            case 'View All Departments':
                return viewAllDepts();
            case 'View All Roles':
                return viewAllRoles();
            case 'View All Employees':
                return viewAllEmployees();
            case 'Add Department':
                return addDepartment();
            case 'Add Role':
                return addRole();
            case 'Add Employee':
                return addEmployee();
            case 'Update Employee Role':
                return updateEmpRole();
        }
    })
}

function viewAllDepts() {
    // pulls the data from department database
    app.get("/api/department", (req,res) => {
        const sql = `SELECT department.id AS id, department.department_name AS department `
        
        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: "success",
                data: rows,
            });
        });
    })
}

function viewAllRoles() {
    // pulls the data from employee_role database
}

function viewAllEmployees() {
    // pulls the data from the employee database
}

function addDepartment() {
    inquirer
    .prompt([
        {
            title: 'input',
            name: 'addDept',
            message: 'What is the name of the department?',
        }
    ])
    .then(answers => {
        // need to send the answer into the department database
        app.post("/api/new-deparment", (req, res) => {
            const sql = `INSERT INTO department(department_name) VALUES(?)`
            const params = answers.addDept

            db.query(sql, params, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: "success",
                    data: body,
                });
            });
        })
    })
}

function addRole() {
    inquirer
    .prompt([
        {
            title: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            title: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        },
        {
            title: 'list',
            name: 'roleDepartment',
            // need to get the options from the department database
            choices: []
        }

    ])
    .then(answers => {
        app.post("/api/employee_roles", (req, res) => {
            const sql = `INSERT INTO employee_role(title) VALUES(?), employee_role(salary) VALUES(?), employee_role(department_id) VALUES(?) `
            const params = [answers.roleName, answers.roleSalary, answers.roleDepartment]
            
            db.query(sql, params, (err, result) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: "success",
                    data: body,
                });
            });
        })
    })
}

function addEmployee() {
    // inquirer to ask the employee questions

}

function updateEmpRole() {
    // inquirer to update employee role in the database
}

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();