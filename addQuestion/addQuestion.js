const http = require('http');
const url = require('url');
const mysql = require('mysql');
const querystring = require('querystring');




const server = http.createServer(function (req, res) {

    // our parsed data from POST
    let q_id,q,c1,c2,c3,c4;

    if ( req.method=='POST' ) {
        
        let body = '';
        
        //handle errors
        req.on('error', (err) => {
            if(err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('error');
                res.end();
                return;
            }
        });
        
        // read POST data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            let parsed = JSON.parse(body);
            
            q_id = parsed.q_id;
            q = parsed.q;
            c1 = parsed.c1;
            c2 = parsed.c2;
            answer = parsed.answer;
            c3 = parsed.c3;
            c4 = parsed.c4;

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


                //add q_id,q,c1,c2 and answer to DB
                sql = ""
                + "\nINSERT INTO question( q_id,q,c1,c2,answer )"
                + "\nVALUES"
                + "\n('"+q_id+"','"+q+"','"+c1+"','"+c2+"',"+answer+");";

                con.query(sql,function(err2, result, fields) {
                    if (err2) throw err2;
                });



                if ( c3 ) {
                    //add 3rd choice to DB
                    sql = ""
                    + "\nINSERT INTO choice_3( q_id,c3 )"
                    + "\nVALUES"
                    + "\n('"+q_id+"','"+c3+"');";
                    
                    con.query(sql,function(err2, result, fields) {
                        if (err2) throw err2;
                    });
                }



                if ( c4 ) {
                    //add 4th choice to DB
                    sql = ""
                    + "\nINSERT INTO choice_4( q_id,c4 )"
                    + "\nVALUES"
                    + "\n('"+q_id+"','"+c4+"');";
                    
                    con.query(sql,function(err2, result, fields) {
                        if (err2) throw err2;
                    });
                }
   
                console.log("Question added successfully.");
                res.write("q_add_success");
                res.end();


        });
        
        // end the connection
        con.end;


        });

    }
    
    
    
    
    
    
    
    
    
    
    
    
     if ( req.method == 'PUT' ) {
        
        let body = '';
        
        //handle errors
        req.on('error', (err) => {
            if(err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('error');
                res.end();
                return;
            }
        });
        
        // read PUT data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            
            let parsed = JSON.parse(body);
            
            q_id = parsed.q_id;
            q = parsed.q;
            c1 = parsed.c1;
            c2 = parsed.c2;
            answer = parsed.answer;
            c3 = parsed.c3;
            c4 = parsed.c4;

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

                //update q_id,q,c1,c2 and answer in DB
                sql = ""
                + "\nUPDATE question"
                + "\nSET q = '"+q+"', c1 = '"+c1+"', c2 = '"+c2+"', answer = '"+answer+"'"
                + "\nWHERE q_id = '"+q_id+"';";

                con.query(sql,function(err2, result, fields) {
                    if (err2) throw err2;
                });




                //delete 3rd choice from DB
                sql = ""
                + "\nDELETE FROM choice_3"
                + "\nWHERE q_id = '"+q_id+"';";
                
                con.query(sql,function(err2, result, fields) {
                    if (err2) throw err2;
                });

                if ( c3 ) {
                    //insert 3rd choice into DB
                    sql = ""
                    + "\nINSERT INTO choice_3( q_id,c3 )"
                    + "\nVALUES"
                    + "\n('"+q_id+"','"+c3+"');";
                    
                    con.query(sql,function(err2, result, fields) {
                        if (err2) throw err2;
                    });
                }






                //delete 4th choice from DB
                sql = ""
                + "\nDELETE FROM choice_4"
                + "\nWHERE q_id = '"+q_id+"';";
                
                con.query(sql,function(err2, result, fields) {
                    if (err2) throw err2;
                });

                if ( c4 ) {
                    //insert 4th choice into DB
                    sql = ""
                    + "\nINSERT INTO choice_4( q_id,c4 )"
                    + "\nVALUES"
                    + "\n('"+q_id+"','"+c4+"');";
                    
                    con.query(sql,function(err2, result, fields) {
                        if (err2) throw err2;
                    });
                }




                console.log("Question updated successfully.");
                res.write("q_update_success");
                res.end();


        });
        
        // end the connection
        con.end;


        });

    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     if ( req.method == 'DELETE' ) {
        
        let body = '';
        
        //handle errors
        req.on('error', (err) => {
            if(err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('error');
                res.end();
                return;
            }
        });
        
        // read PUT data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            
            let parsed = JSON.parse(body);
            q_id = parsed.q_id;


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



                //DELETE question from DB
                sql = ""
                + "\nDELETE FROM question"
                + "\nWHERE q_id = '"+q_id+"';";

                con.query(sql,function(err2, result, fields) {
                    if (err2) throw err2;
                });
   
   
   
                console.log("Question deleted successfully.");
                res.write("q_delete_success");
                res.end();


        });
        
        // end the connection
        con.end;


        });

    }
    




    
    
    
});

server.listen();




