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
          process.exit()
      }
    });
}

function viewAllDepts() {
  // pulls the data from department database
  const sql = `SELECT id AS id, department_name AS department FROM department ORDER BY department.department_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  });
}

function viewAllRoles() {
   // pulls the data from employee_role database
  const sql = `SELECT * FROM employee_role JOIN department ON employee_role.department_id = department.id`

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows)
    mainMenu();
  })
}

// id fn ln title department salary manager
function viewAllEmployees() {
  // pulls the data from the employee database
  const sql = `SELECT * FROM employee`

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows)
    mainMenu();
  })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What is the name of the department?",
      },
    ])
    .then(answers => {
      // need to send the answer into the department database
      const sql = `INSERT INTO department(department_name) VALUES(?)`;
      const params = answers.addDept;

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.info(`added ${answers.addDept} to the database`);
        mainMenu();
      });
    });
}

function addRole() {
  const getDepartments = []
  db.query(`SELECT department.department_name, department.id FROM department`, (err, result) => {
    for (let i=0; i<result.length; i++) {
      getDepartments.push({name: result[i].department_name, value: result[i].id});
    }
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "Which department is the role?",
        choices: getDepartments
      },
    ])
    .then(answers => {
      const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES(?, ?, ?) `;
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
        mainMenu();
      });
    });
  })
}

function addEmployee() {
  const getTitle = [];
    db.query(`SELECT employee_role.title, employee_role.id FROM employee_role`, (err, result) => {
      for (let i=0; i<result.length; i++) {
        getTitle.push({name: result[i].title, value: result[i].id})
      }
    const getManager= [];
    db.query(`SELECT employee.first_name, employee.manager_id FROM employee`, (err, result) => {
      for (let j=0; j<result.length; j++) {
        getManager.push({name: result[j].first_name, value: result[j].id})
      }
    // inquirer to ask the employee questions
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is employee's last name?",
        },
        {
          type: "list",
          name: "empRole",
          message: "What is the employee's role?",
          // need to get the options from the department database
          choices: getTitle
        },
        {
          type: "list",
          name: "empManager",
          message: "What is the employee's manager?",
          // need to get the names of the manager
          choices: getManager
        }
      ])
      .then(answers => {
        const sql = `INSERT INTO employee (first_name, last_name , role_id, manager_id) VALUES(?, ?, ?, ?)`;
        const params = [
          answers.firstName,
          answers.lastName,
          answers.empRole,
          answers.empManager
        ];

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err)
            return;
          }
          console.info(`added ${answers.roleName} to the database`)
          mainMenu();
        });
      });
    });
  })
}

function updateEmpRole() {
  // inquirer to update employee role in the database
  inquirer
  .prompt([
    {
      type: "list",
      name: "pickEmployee",
      message: "Which employee's role would you like to update?",
      // get all the employee names here
      choices: []
    },
    {
      type: "list",
      name: "newRole",
      message: "What role do you want to reassign for the selected employee?",
      // get all the role options here
      choices: []
    }
    // console.info("Updated employee's role")
  ])
  .then(answers => {
    const sql = ``;
  }) 
}

function init() {
  mainMenu();
}

init();
