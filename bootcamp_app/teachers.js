const pg = require('pg');
const pool = pg.Pool


const config = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
};

pool.connect(() => {
  console.log('connected to the database');
});

let cohort = process.argv[2];

pool.query(`
  SELECT DISTINCT teachers.name AS teacher, 
                cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = assistance_requests.student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = 
  ORDER BY teacher; $1
  `, [`${cohort  || 'JUL02'}`])
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));