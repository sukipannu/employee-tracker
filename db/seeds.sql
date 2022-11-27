INSERT INTO dept (department_name)
VALUES
("Sales"),
("Customer Service"),
("Marketing"),
("Engineering"),
("Web Development"),
("Management");

INSERT INTO emp_role (role_title, department_id, role_salary)
VALUES
("Sales Representative", 1, 45000),
("Customer Service Representative", 2, 32000),
("Social Media", 3, 35000),
("Front End Developer", 4, 75000),
("Back End Developer", 4, 67000),
("Full Stack Developer", 5, 93000),
("CEO", 6, 97000);


INSERT INTO employees (first_name, last_name, r_id, manager_id)
VALUES
("Summer", "Kaur", 7, 1),
("Alex", "Pannu", 1, 1),
("Suki", "Pannu", 3, 1),
("Kaitlyn", "Wright", 2, 1),
("Alyssa","Grace", 4, 1),
("Elijah", "Williams", 4, 1),
("Veer", "Pratap", 5, 1),
("Esha", "Otal", 6, 5);