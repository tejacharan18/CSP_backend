const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:1521/orcl",
};

const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return (error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  
  let Sql;
  console.log(typeof (Parameters[2]));
  Details = Parameters[2];
//   Details = Details.map((value)=>value.split(','));
    try{
      Details = eval(`(${Parameters[2]})`);
    } catch(err){}
  // for(let i=0;i<Details.length;i++){
  //   const detail=Details[i];
  // }
  console.log(Details);
 switch (Parameters[1]) {
        case "Read":
        Sql = `select * from ${Parameters[0]}`;
      console.log(Details.length);
        if(Details != "All"){
          Sql = `select disease_name from ${Parameters[0]} join symptoms ON disease.disease_id = symptoms.disease_id 
           where symptoms.symptom_name in ('${Details[0]}','${Details[1]}','${Details[2]}','${Details[3]}','${Details[4]}','${Details[5]}','${Details[6]}','${Details[7]}','${Details[8]}','${Details[9]}','${Details[10]}')
           group by disease.disease_id,disease.disease_name having count(distinct symptoms.symptom_name)>=3` ;
        }

        
      break;
    default:
      console.error("Invalid Parameters");
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  return result;
};

  
module.exports = Result;





// if (Details != "All") {
//   // Split the 'Details' string into an array of symptom names
//   const symptomNames = Details.split(',');

//   // Generate placeholders for the array of symptom names
//   const placeholders = symptomNames.map(() => '?').join(', ');

//   // Construct the SQL query with parameterized query
//   const query = `SELECT disease_name FROM ${Parameters[0]} JOIN symptoms ON disease.disease_id = symptoms.disease_id
//     WHERE symptoms.symptom_name IN (${placeholders})
//     GROUP BY disease.disease_id, disease.disease_name HAVING COUNT(DISTINCT symptoms.symptom_name) >= 3`;

//   // Execute the query with the array of symptom names as parameters
//   connection.query(query, symptomNames, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//     } else {
//       console.log('Query result:', result);
//     }
//   });
// }



