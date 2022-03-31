const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questions = [
    {
        type: 'input',
        message: ""
    }
]

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

}

function viewAllRoles() {

}

function viewAllEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmpRole() {

}

const db = mysql.createConnection(
    {
        host: "localhost",
        // MySQL username,
        user: "root",
        // TODO: Add MySQL password here
        password: "",
        database: "movies_db",
    },
    console.log(`Connected to the employee database.`)
);
