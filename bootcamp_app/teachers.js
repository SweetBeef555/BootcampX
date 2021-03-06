const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'vagrant'
});

const cohortName = process.argv[2];
// const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [cohortName];
let queryString =`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort 
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  });
});
