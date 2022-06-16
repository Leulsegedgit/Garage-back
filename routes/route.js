const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysqlConnection = require('../db');

//crude operation for users
router.get('/users',(req,res,next)=>{
    //res.send('Retriving contacts')
    mysqlConnection.query("SELECT * FROM users ;",(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        
    }
});
});
router.get('/getpendingregisters/',(req,res,next)=>{
    //res.send('Retriving contacts')
    mysqlConnection.query("SELECT * FROM register_request LIMIT 10;",(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
       
    }
});
});
//fetch single data
router.get('/getpendingregisters/:id',(req,res,next)=>{
    //res.send('Retriving contacts')
    let ID=req.params.id;
    mysqlConnection.query("SELECT * FROM register_request where id=?",(err,rows,fields)=>{
    if(!err){
       
        res.send(rows);
        
    }
    else{
       
    }
});
});

router.post('/gettechnician',(req,res,next)=>{
    let technician = req.body;
mysqlConnection.query('SELECT * FROM technicians WHERE id = ? || first_name = ? || middle_name = ? || last_name = ? || phone_number = ? || major = ? || level = ? || date = ? LIMIT 10;',[technician.id,technician.first_name,technician.middle_name,technician.last_name,technician.phone_number,technician.major,technician.level,technician.date],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
       
    }
});
});

router.post('/getdriver',(req,res,next)=>{
    let driver = req.body;
    
mysqlConnection.query('SELECT * FROM drivers WHERE id = ?;',[driver.id],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        
    }
});
});

router.delete('/deletependingregisters/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM register_request WHERE id = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});


router.delete('/deletetechnician/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM technicians WHERE id = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});

function verifyToken(req, res, next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request:1')
    }
    let token = req.headers.authorization.split([' '])[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request:2')
    }
    let payload = jwt.verify(token,'secretkey_fpc')
    if(!payload){
        return res.status(401).send('Unauthorized request:3')
    }
    req.password = payload.subject
    next()
}

router.post('/getuser', (req,res,next)=>{
    let usr = req.body;
    var sql = "SELECT * FROM users WHERE  first_name = ? && password = ? ";
    mysqlConnection.query(sql,[usr.first_name,usr.password],(err,rows,fields)=>{
        if(!err){
            if(rows.length > 0)
            { 
                var row
                Object.keys(rows).forEach(function(key) {
                     row = rows[key];
                    
                });
                let payload = {subject: row.id}
            let token = jwt.sign(payload,'secretkey_fpc',)
            
            res.send({token,type: row.type});
            
            }
            else res.send('');
        }
        else{
            res.send(err);
        }
    });

});
//
router.post('/adduser',(req,res,next)=>{
    let usr = req.body;
    var sql = "INSERT IGNORE INTO users(id,first_name,last_name,password,type) VALUES(?,?,?,?,?);";
    
    mysqlConnection.query(sql,[usr.id,usr.first_name,usr.last_name,usr.password,usr.type],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.post('/addtechnician',(req,res,next)=>{
    let technician = req.body;
    var sql = "INSERT IGNORE INTO technicians(id,first_name,middle_name,last_name,phone_number,major,level,date) VALUES(?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[technician.id,technician.first_name,technician.middle_name,technician.last_name,technician.phone_number,technician.major,technician.level,technician.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.post('/adddriver',(req,res,next)=>{
    let driver = req.body;
    var sql = "INSERT IGNORE INTO drivers(id,first_name,middle_name,last_name,phone_number,address,city,state,date) VALUES(?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[driver.id,driver.first_name,driver.middle_name,driver.last_name,driver.phone_number,driver.address,driver.city,driver.state,driver.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.post('/adduserregistrationrequest',(req,res,next)=>{
    let usr = req.body;
    var sql = "INSERT IGNORE INTO register_request(id,first_name,last_name,password,email,title) VALUES(?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[usr.id,usr.first_name,usr.last_name,usr.password,usr.email,usr.title],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/users/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM contacts WHERE id = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});
//store request 
router.post('/getstorerequest', verifyToken, (req,res,next)=>{
    let store = req.body;
mysqlConnection.query('SELECT * FROM store_request WHERE request_number = ?  LIMIT 10;',[store.request_number],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
       
    }
});
});


router.post('/addstorerequest',(req,res,next)=>{
    let store = req.body;
    var sql = "INSERT IGNORE INTO store_request(request_number,service_number,part_number,requester,approver,quantity,date) VALUES(?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[store.request_number,store.service_number,store.part_number,store.requester,store.approver,store.quantity,store.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editstorerequest',(req,res,next)=>{
    let store_request = req.body;
    var sql = "UPDATE store_request SET  part_number = ? , request_number = ? , service_number = ? , requester = ? , approver = ?,quantity = ? , date = ? WHERE request_number = ?;";
    
    mysqlConnection.query(sql,[store_request.part_number,store_request.request_number,store_request.service_number,store_request.requester,store_request.approver,store_request.quantity,store_request.date,store_request.request_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletestorerequest/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM store_request WHERE request_number = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});
//Store receive
router.post('/getstorereceive',(req,res,next)=>{
    let store_receive = req.body;
mysqlConnection.query('SELECT * FROM store_receive WHERE plate_number = ? || receive_vocher_number = ? || part_number = ? LIMIT 10;',[store_receive.plate_number,store_receive.receive_vocher_number,store_receive.part_number],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
       
    }
});
});


router.post('/addstorereceive',(req,res,next)=>{
    let store_receive = req.body;
    var sql = "INSERT IGNORE INTO store_receive(plate_number,receive_vocher_number,part_number,receiver,deliverer,supplier,refference,unit_price,quantity_received,quantity_remaining,date) VALUES(?,?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[store_receive.plate_number,store_receive.receive_vocher_number,store_receive.part_number,store_receive.receiver,store_receive.deliverer,store_receive.supplier,store_receive.refference,store_receive.unit_price,store_receive.quantity_received,store_receive.quantity_remaining,store_receive.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.put('/editstorereceive',(req,res,next)=>{
    let store_receive = req.body;
    var sql = "UPDATE store_receive SET plate_number = ? , receive_vocher_number = ? , part_number = ? , receiver = ? , deliverer = ? , supplier = ? , refference = ? , unit_price = ? , quantity_received = ? , quantity_remaining = ? , date = ? WHERE receive_vocher_number = ?;";
    
    mysqlConnection.query(sql,[store_receive.plate_number,store_receive.receive_vocher_number,store_receive.part_number,store_receive.receiver,store_receive.deliverer,store_receive.supplier,store_receive.refference,store_receive.unit_price,store_receive.quantity_received,store_receive.quantity_remaining,store_receive.date,store_receive.receive_vocher_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletestorereceive/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM store_receive WHERE part_number = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});

//store issue

router.post('/getstoreissue',(req,res,next)=>{
    let store_issue = req.body;
mysqlConnection.query('SELECT * FROM store_issue WHERE issue_refference_number = ?  LIMIT 10;',[store_issue.issue_refference_number],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
       
    }
});
});


router.post('/addstoreissue',(req,res,next)=>{
    let store_issue = req.body;
    var sql = "INSERT IGNORE INTO store_issue(request_number,issue_refference_number,part_number,quantity_available,quantity_requested,date) VALUES(?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[store_issue.request_number,store_issue.issue_refference_number,store_issue.part_number,store_issue.quantity_available,store_issue.quantity_requested,store_issue.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editstoreissue',(req,res,next)=>{
    let store_issue = req.body;
    var sql = "UPDATE store_issue SET  request_number = ? , issue_refference_number = ? , part_number = ? ,quantity_available = ?, quantity_requested = ? , date = ? WHERE issue_refference_number = ?;";
    
    mysqlConnection.query(sql,[store_issue.request_number,store_issue.issue_refference_number,store_issue.part_number,store_issue.quantity_available,store_issue.quantity_requested,store_issue.date,store_issue.issue_refference_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletestoreissue/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM store_issue WHERE issue_refference_number = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});


//spare

router.post('/getspare',(req,res,next)=>{
    let store_issue = req.body;
mysqlConnection.query('SELECT * FROM spare WHERE part_number = ?  LIMIT 10;',[store_issue.part_number],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});


router.post('/addspare',(req,res,next)=>{
    let spare = req.body;
    var sql = "INSERT IGNORE INTO spare(part_number,part_name,unit_measure,vehicle_type,unit_price,store_number,part_type,location,description,date) VALUES(?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[spare.part_number,spare.part_name,spare.unit_measure,spare.vehicle_type,spare.unit_price,spare.store_number,spare.part_type,spare.location,spare.description,spare.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editspare',(req,res,next)=>{
    let spare = req.body;
    var sql = "UPDATE spare SET  part_number = ? , part_name = ? , unit_measure = ? ,vehicle_type = ?, unit_price = ?,store_number = ?,part_type = ?,location = ?,description = ? , date = ? WHERE part_number = ?;";
    
    mysqlConnection.query(sql,[spare.part_number,spare.part_name,spare.unit_measure,spare.vehicle_type,spare.unit_price,spare.store_number,spare.part_type,spare.location,spare.description,spare.date,spare.part_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletespare/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM spare WHERE part_number = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});
//Employee registration

router.post('/getemploye',(req,res,next)=>{
    let employe = req.body;
mysqlConnection.query('SELECT * FROM employe WHERE employe_id = ?  LIMIT 10;',[employe.employe_id],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});


router.post('/addemploye',(req,res,next)=>{
    let employe = req.body;
    var sql = "INSERT IGNORE INTO employe(employe_id,title,name,gender,profession,responsibility,department,directorate,division,mastebaberiya,team,level,type,salary,birth_date,hire_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[employe.employe_id,employe.title,employe.name,employe.gender,employe.profession,employe.responsibility,employe.department,employe.directorate,employe.division,employe.mastebaberiya,employe.team,employe.level,employe.type,employe.salary,employe.birth_date,employe.hire_date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editemploye',(req,res,next)=>{
    let employe = req.body;
    var sql = "UPDATE spare SET  employe_id = ? , title = ? , name = ? ,gender = ?, profession = ?,responsibility = ?,department = ?,directorate = ? , division = ?,mastebaberiya = ?, team = ?, level = ?, type = ?, salary = ?, birth_date =?, hire_date = ? WHERE issue_refference_number = ?;";
    
    mysqlConnection.query(sql,[employe.employe_id,employe.title,employe.name,employe.gender,employe.profession,employe.responsibility,employe.department,employe.directorate,employe.division,employe.mastebaberiya,employe.team,employe.level,employe.type,employe.salary,employe.birth_date,employe.hire_date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deleteemploye/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM employe WHERE employe_id  = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});

//helper functions
router.get('/getnames/:starting',(req,res,next)=>{
    //res.send('Retriving contacts')
    let starting = req.params.starting;
    starting = starting+'%'
    
    mysqlConnection.query("SELECT name FROM employe where name  LIKE ?",starting,(err,rows,fields)=>{
    if(!err){
       
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});

router.get('/getbypartnumber/:partnumber',(req,res,next)=>{
    //res.send('Retriving contacts')
    let partnumber = req.params.partnumber;
    
    
    mysqlConnection.query("SELECT part_name FROM spare where part_number  = ?",partnumber,(err,rows,fields)=>{
    if(!err){
       
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});

module.exports = router;