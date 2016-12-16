CREATE TABLE waitstaff (
	id SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	active BOOLEAN
	);

CREATE TABLE mesa (
	mesa_number INTEGER,
	capacity INTEGER,
	waitstaff_id INT REFERENCES waitstaff(id),
	mesa_status VARCHAR(20)
	);

INSERT INTO waitstaff (first_name, last_name, active) VALUES ('Bob', 'Dylan', TRUE);
INSERT INTO waitstaff (first_name, last_name, active) VALUES ('Robert', 'Zimmerman', FALSE);

INSERT INTO mesa (mesa_number, capacity, mesa_status) VALUES (42, 4, 'empty');
INSERT INTO mesa (mesa_number, capacity, mesa_status) VALUES (31, 2, 'empty');
