const db = require("../db/connect");
const inquirer = require("inquirer");
require("console.table");

function init() {
  console.log("");
  console.table(`
  ***********************************
  *                                 *
  *         Employee Tracker        *
  *                                 *
  ***********************************
  `);
  setTimeout(() => {
    mainMenu();
  }, 1000);
}

function mainMenu() {
  console.log("");
  inquirer
    .prompt({
      type: "list",
      name: "home",
      message: "Please slecect a choice.",
      choices: [
        "View our departments",
        "View all roles",
        "List all employees",
        "List employees by department",
        "Add role",
        "Add department",
        "Add employee",
        "Update an exsisting employee",
        "Exit",
      ],
    })
    .then(({ home }) => {
      if (home === "View our departments") {
        vDepts();
      } else if (home === "View all roles") {
        vRoles();
      } else if (home === "List all employees") {
        vEmploy();
      } else if (home === "List employees by department") {
        vEmployDept();
      } else if (home === "Add role") {
        aRole();
      } else if (home === "Add department") {
        aDept();
      } else if (home === "Add employee") {
        aEmployee();
      } else if (home === "Update an exsisting employee") {
        updateEmploy();
      } else if (home === "Exit") {
        endInit();
      }
    });
}

// VIEW DEPARTMENTS
function vDepts() {
  const sql = `SELECT dept_id AS id, department_name AS name FROM dept`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.log("");
    console.table(rows);
    setTimeout(() => {
      mainMenu();
    }, 750);
  });
}

// VIEW ROLES
function vRoles() {
  const sql = `SELECT role_id AS id, role_title AS title, department_name AS name, role_salary AS salary FROM emp_role
  LEFT JOIN dept ON emp_role.department_id = dept.dept_id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.log("");
    console.table(rows);
    setTimeout(() => {
      mainMenu();
    }, 800);
  });
}

// VIEW EMPLOYEES
function vEmploy() {
  const sql = `SELECT e.emp_id AS id, concat(e.first_name,' ', e.last_name) AS employee, e.role_title AS title, e.role_salary AS salary, e.department_name AS dept,
  CASE WHEN e.manager_id = e.emp_id THEN concat('N/A') ELSE concat(m.first_name, ' ', m.last_name) END AS manager FROM (SELECT * FROM employees LEFT JOIN emp_role ON employees.r_id = emp_role.role_id LEFT JOIN dept ON emp_role.department_id = dept.dept_id) AS e, employees m WHERE m.emp_id = e.manager_id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.table(rows);
    setTimeout(() => {
      mainMenu();
    }, 800);
  });
}

// VIEW EMPLOYEES BY DEPARTMENT
function vEmployDept() {
  const getDepartments = new Promise((resolve, reject) => {
    var departmentsArr = [];
    const sql = `SELECT department_name FROM dept`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      // ROLE FOR LOOP
      for (var i = 0; i < rows.length; i++) {
        departmentsArr.push(Object.values(rows[i])[0]);
      }
      resolve(departmentsArr);
    });
  });
  getDepartments.then((departmentsArr) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Choose the department of your role",
          choices: departmentsArr,
          filter: (deptIdInput) => {
            if (deptIdInput) {
              return departmentsArr.indexOf(deptIdInput);
            }
          },
        },
      ])
      .then(({ departmentId }) => {
        const sql = ` SELECT e.emp_id as id, concat(e.first_name,' ', e.last_name) AS employee, e.role_title AS title, e.role_salary AS salary, e.department_name AS dept, 
          CASE WHEN e.manager_id = e.emp_id THEN concat('N/A') ELSE concat(m.first_name, ' ', m.last_name) END AS manager 
          FROM (SELECT * FROM employees LEFT JOIN emp_role ON employees.r_id = emp_role.role_id LEFT JOIN dept ON emp_role.department_id = dept.dept_id) AS e, employees m 
          WHERE m.emp_id = e.manager_id
          AND dept_id = ? `;
        const query = [departmentId + 1];
        db.query(sql, query, (err, rows) => {
          if (err) {
            console.log(err.message);
          }
          console.table(rows);
          mainMenu();
        });
      });
  });
}