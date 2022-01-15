const getStudents = async (request, response) => {
  const connection = dbConnection.getConnection();
  let statement = "";

  // prepare the statement as per criteria
  if (request.query && request.query.class) {
    statement = `select * from student where class like '%${request.query.class}%'`;
  } else if (request.query && request.query.division) {
    statement = `select * from student where division = '${request.query.division}'`;
  } else if (request.query && request.query.birthYear) {
    statement = `SELECT * FROM student WHERE DATE_FORMAT(dob,'%Y') = ${request.query.birthYear}`;
  } else {
    statement = `select * from student`;
  }

  // execute the query
  connection.query(statement, (error, data) => {
    // close the database connection
    connection.end();

    if (error) {
      // there is an error while executing the sql statement
      response.send(error);
    } else {
      // there is no error
      console.log("data ", data);
      return response.status(200).json(data);
    }
  });
};

const getStudentByRollNo = (request, response) => {
  console.log("Student list goes here");

  console.log("params", request.params);
  const rollNo = request.params.rollNo;

  const connection = dbConnection.getConnection();

  // prepare the statement
  const statement = `select * from student where roll_no = ${rollNo}`;

  // execute the query
  connection.query(statement, (error, data) => {
    // close the database connection
    connection.end();

    if (error) {
      // there is an error while executing the sql statement
      response.send(error);
    } else {
      // there is no error
      console.log("data ", data[0]);
      return response.status(200).json(data[0]);
    }
  });
};

const deleteStudentByRollNo = (request, response) => {
  console.log("params", request.params);
  const rollNo = request.params.rollNo;

  const connection = dbConnection.getConnection();

  // prepare the statement
  const statement = `Delete from student where roll_no = ${rollNo}`;

  // execute the query
  connection.query(statement, (error, data) => {
    // close the database connection
    connection.end();

    if (error) {
      // there is an error while executing the sql statement
      console.log(error);
      response.status(200).send(error);
    } else {
      // there is no error
      console.log("data ", data);
      return response.status(200).json(data);
    }
  });
};

const createStudent = async (request, response) => {
  //1. Take data from body  
  const body = request.body;
  const connection = dbConnection.getConnection();
  // prepare the statement with params
  const statement = `INSERT INTO student (name, class, division, dob, parent_mobile_no) 
                            VALUES ('${body.name}', '${body.class}', '${body.division}', '${body.dob}', '${body.parentMobileNo}') `;

  // execute the query
  connection.query(statement, async (error, data) => {
    // close the database connection
    connection.end();

    if (error) {
      // there is an error while executing the sql statement
      console.log(error);
      return response.status(200).send(error);
    } else {
      // there is no error
      console.log("data ", data);
      return response.status(200).json(data);
    }
  });
};

const patchStudent = async (request, response) => {
  const body = request.body;
  const rollNo = request.params.rollNo;
  const connection = dbConnection.getConnection();

  // find the student by roll no
  const getStudentQuery = `select * from student where roll_no = ${rollNo}`;

  // Then update student
  connection.query(getStudentQuery, async (error, student) => {
    const updateQuery = `update student set class = '${body.class}', division = '${body.division}' where roll_no = ${rollNo}`;
    connection.query(updateQuery, async (error, data) => {
      // close the database connection
      connection.end();

      if (error) {
        // there is an error while executing the sql statement
        console.log(error);
        return response.status(200).send(error);
      } else {
        // there is no error
        console.log("data ", data);
        return response.status(200).json(data);
      }
    });
  });
};

module.exports = {
  getAllStudents: getStudents,
  getStudentByRollNo: getStudentByRollNo,
  deleteStudentByRollNo: deleteStudentByRollNo,
  createStudent: createStudent,
  patchStudent: patchStudent,
};
