const http = require('http');
const url = require('url');
const mysql = require('mysql');





const server = http.createServer(function (req, res) {
    
	res.writeHead(200, {
        'Content-type':'text/html',
        "Access-Control-Allow-Origin": "*"
    });
    
    //Create connection
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'synoftqc_admin',
        password: '27hWr9Up2mz7D5b82Yh',
        database: 'synoftqc_quiz'
    });
    
    //Connect to MySQL to run SQL query
    con.connect(function (err) {
        if (err) throw err;
        console.log('connected!');
        
        
        let sql;


        //starting index for ADDING a question
        sql = ""
        + "\nSELECT MAX(q_id) AS Starting_index"
        + "\nFROM question";
        

        con.query(sql,function(err2, result, fields) {
            if (err2) throw err2;
            
            res.write("{\"Starting_index\" : ");
            res.write( JSON.stringify(result[0].Starting_index) );

            if ( result[0].Starting_index === null ) {
                res.write("}");
                res.end();
                return;
            }
            else {
                res.write(", ");
            }

        });







        //get all questions
        sql = ""
        + "\nSELECT qs.q_id, qs.q, qs.c1, qs.c2, qs.answer, (SELECT c3"
		+ "\n				FROM choice_3"
		+ "\n				WHERE choice_3.q_id = qs.q_id) AS c3,"
		+ "\n				(SELECT c4"
		+ "\n				FROM choice_4"
		+ "\n				WHERE choice_4.q_id = qs.q_id) AS c4"
        + "\nFROM question qs";


        con.query(sql,function(err2, result, fields) {
            if (err2) throw err2;

            res.write("\"rawDB\" : ");
            res.write( JSON.stringify(result) );
            res.write("}");

            console.log("Database read successfully.");
            res.end();
            
        });

        
        
        
    });
    
    
    // end the connection
    con.end;
    
});

server.listen();




