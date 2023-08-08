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
    try{
      Details = eval(`(${Parameters[2]})`);
    } catch(err){}
 switch (Parameters[1]) {
    case "Insert":
      Sql = `insert into ${Parameters[0]} values('${Details.patient_name}',
      '${Details.age}','${Details.email}','${Details.phone_no}','${Details.height}','${Details.weight}',
      '${Details.blood_group}','${Details.previous_health_issues}','${Details.disability}',
      '${Details.diabetic}','${Details.address}','${Details.img}')`;
      break;
    case "Update":
      Sql = `update ${Parameters[0]} set 
      patient_name = '${Parameters[3].patient_name}', age='${Parameters[3].age}', 
      email='${Parameters[3].email}', phone_no='${Parameters[3].phone_no}', 
      height='${Parameters[3].height}', weight='${Parameters[3].weight}',
       blood_group='${Parameters[3].blood_group}',
        previous_health_issues='${Parameters[3].previous_health_issues}',
         disability='${Parameters[3].disability}', diabetic='${Parameters[3].diabetic}' , 
         address='${Parameters[3].address}'
         where email = '${Details}'`;
      break;
    case "Delete":
      Sql = `delete from ${Parameters[0]} where email = '${Details}'`;
      break;
    case "Read":
        Sql = `select * from ${Parameters[0]}`;
        if(Details != "All"){
          Sql = `select * from ${Parameters[0]} where email = '${Details}'`;
        }
      break;
    case "View":
          Sql = `select email,phone_no from ${Parameters[0]} where email = '${Details}'`;
        
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