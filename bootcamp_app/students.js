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

let cohortName = process.argv[2];
const limit = process.argv[3] || 5;

pool.query(`
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohort.name = $1
  LIMIT $2;
  `, [`%${cohortName}%`, limit])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
})
}).catch(err => console.error('query error', err.stack));