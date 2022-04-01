// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

// connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee database.`)
);

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewOptions",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "I'm Done",
        ],
      },
    ])
    .then(answers => {
      switch (answers.viewOptions) {
        case "View All Departments":
          return viewAllDepts();
        case "View All Roles":
          return viewAllRoles();
        case "View All Employees":
          return viewAllEmployees();
        case "Add Department":
          return addDepartment();
        case "Add Role":
          return addRole();
        case "Add Employee":
          return addEmployee();
        case "Update Employee Role":
          return updateEmpRole();
        default:
          return;
      }
    });
}

function viewAllDepts() {
  // pulls the data from department database
  const sql = `SELECT id AS id, department.department_name AS department FROM department ORDER BY department.department_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
}

function viewAllRoles() {
  db.query(`SELECT department.department_name FROM department`, (err, result) => {
    const getDepartments = []
    for (let i=0; i<result.length; i++) {
      getDepartments.push(result[i]);
    }
    console.info(getDepartments)
  })

  // // pulls the data from employee_role database
  // const sql = `SELECT * FROM employee_role`

  // db.query(sql, (err, rows) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.table(rows)
  // })
}

function viewAllEmployees() {
  // pulls the data from the employee database
  const sql = `SELECT * FROM employee`
}

function addDepartment() {
  inquirer
    .prompt([
      {
        title: "input",
        name: "addDept",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      // need to send the answer into the department database
      const sql = `INSERT INTO department(department_name) VALUES(?)`;
      const params = answers.addDept;

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.info(`added ${answers.addDept} to the database`);
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        title: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        title: "input",
        name: "roleSalary",
        message: "What is the salary of the role?",
      },
      {
        title: "list",
        name: "roleDepartment",
        message: "Which department is the role?",
        // need to get the options from the department database
        choices: getDepartments
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO employee_role(title) VALUES(?), employee_role(salary) VALUES(?), employee_role(department_id) VALUES(?) `;
      const params = [
        answers.roleName,
        answers.roleSalary,
        answers.roleDepartment,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        console.info(`added ${answers.roleName} to the database`)
      });
    });
}

function addEmployee() {
  // inquirer to ask the employee questions
  inquirer
    .prompt([
      {
        title: "input",
        name: "firstName",
        message: "What is employee's first name?",
      },
      {
        title: "input",
        name: "lastName",
        message: "What is employee's last name?",
      },
      {
        title: "list",
        name: "empRole",
        message: "What is the employee's role?",
        // need to get the options from the department database
        choices: []
      },
      {
        title: "list",
        name: "empManager",
        message: "What is the employee's manager?",
        // need to get the names of the manager
        choices: []
      }
    ])
    .then((answers) => {
      const sql = `INSERT INTO employee_role(title) VALUES(?), employee_role(salary) VALUES(?), employee_role(department_id) VALUES(?) `;
      const params = [
        answers.roleName,
        answers.roleSalary,
        answers.roleDepartment,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        console.info(`added ${answers.roleName} to the database`)
      });
    });
}

function updateEmpRole() {
  // inquirer to update employee role in the database
  inquirer
  .prompt([
    {
      title: "list",
      name: "pickEmployee",
      message: "Which employee's role would you like to update?",
      // get all the employee names here
      choices: []
    },
    {
      title: "list",
      name: "newRole",
      message: "What role do you want to reassign for the selected employee?",
      // get all the role options here
      choices: []
    }
    // console.info("Updated employee's role")
  ])
}

function init() {
  mainMenu();
}

init();
