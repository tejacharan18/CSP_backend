const oracledb = require('oracledb');
//Set database connection details
const dbConfig = {
    user: 'system',
    password: 'manager',
    connectString: 'localhost:1521/orcl',
  };
const Query = async (sql) => {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(sql);
      await connection.commit();
      return result;
    } catch (error) {
      console.error(error);
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
        Sql = `insert into ${Parameters[0]} values('${Details.licence_num}','${Details.doct_name}','${Details.doct_email}'
        ,'${Details.doct_ph_num}','${Details.doct_age}','${Details.doct_desgn}','${Details.doct_hosp}'
        ,'${Details.doct_exp}','${Details.doct_add}')`;
        break;
      case "Update":
        Sql = `update ${Parameters[0]} set licence_num = '${Parameters[3].licence_num}', doct_name = '${Parameters[3].doct_name}' , 
        doct_email = '${Parameters[3].doct_email}', doct_ph_num = '${Parameters[3].doct_ph_num}', doct_age = '${Parameters[3].doct_age}',
        doct_desgn = '${Parameters[3].doct_desgn}', doct_hosp = '${Parameters[3].doct_hosp}', doct_exp = '${Parameters[3].doct_exp}',
        doct_add = '${Parameters[3].doct_add}' where licence_num = '${Details}'`;
        break;
      case "Delete":
        Sql = `delete from ${Parameters[0]} where licence_num = '${Details}'`;
        break;
      case "Dlogin":
        Sql = `select doct_email,licence_num,doct_name from ${Parameters[0]} where doct_email='${Details}'`;
        break;
      case "sym":
        Sql=`select disease from symptoms where sym_name in(${symptoms}) group by disease having count(distinct sym_name)=3`;
        break;
      case "Read":
          Sql = `select * from ${Parameters[0]}`;
          if(Details != "All"){
            Sql = `select *  from ${Parameters[0]} where licence_num= ${Details}`;
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
  
