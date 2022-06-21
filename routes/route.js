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
    var sql = "SELECT * FROM employe WHERE  employe_id = ? && password = ? ";
    mysqlConnection.query(sql,[usr.first_name,usr.password],(err,rows,fields)=>{
        if(!err){
            if(rows.length > 0)
            { 
                var row
                Object.keys(rows).forEach(function(key) {
                     row = rows[key];
                    
                });
                let payload = {subject: row.employe_id}
            let token = jwt.sign(payload,'secretkey_fpc',)
            
            res.send({token,type: row.type,name: row.name});
            
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

router.put('/decrementstoreremaining',(req,res,next)=>{
    let store_receive = req.body;
    var sql = "UPDATE store_receive SET  quantity_remaining =  ? WHERE part_number = ?;";
    
    mysqlConnection.query(sql,[store_receive.quantity_remaining,store_receive.part_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});


router.get('/getstorereceiveremaining/:part_number',(req,res,next)=>{
    //res.send('Retriving contacts')
    let part_number=req.params.part_number;
    mysqlConnection.query("SELECT quantity_remaining FROM store_receive where part_number = ?",[part_number],(err,rows,fields)=>{
    if(!err){
       
        res.send(rows);
        
    }
    else{
       
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
    var sql = "INSERT IGNORE INTO spare(part_number,part_name,unit_measure,vehicle_type,unit_price,store_number,part_type,location,class_type,heavy_light,consumable,description,date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[spare.part_number,spare.part_name,spare.unit_measure,spare.vehicle_type,spare.unit_price,spare.store_number,spare.part_type,spare.location,spare.class_type,spare.heavy_light,spare.consumable,spare.description,spare.date],(err,rows,fields)=>{
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

//vehicle

router.post('/getvehicle',(req,res,next)=>{
    let vehicle = req.body;
mysqlConnection.query('SELECT * FROM vehicle WHERE plate_number = ?  LIMIT 10;',[vehicle.plate_number],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});


router.post('/addvehicle',(req,res,next)=>{
    let vehicle = req.body;
    var sql = "INSERT IGNORE INTO vehicle(plate_number,chassi_number,fuel_type,factory,price,made_in,service_type,made_year,cc,tyers,description,_condition,heavy_light,load_type) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[vehicle.plate_number,vehicle.chassi_number,vehicle.fuel_type,vehicle.factory,vehicle.price,vehicle.made_in,vehicle.service_type,vehicle.made_year,vehicle.cc,vehicle.tyers,vehicle.description,vehicle._condition,vehicle.heavy_light,vehicle.load_type],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editvehicle',(req,res,next)=>{
    let vehicle = req.body;
    var sql = "UPDATE vehicle SET  plate_number = ? , chassi_number = ? , fuel_type = ? ,factory = ?, price = ?,made_in = ?,service_type = ?,made_year = ?,cc = ?, tyers = ?,description  = ?,_condition = ?, heavy_light = ?, load_type = ? WHERE plate_number = ?;";
    
    mysqlConnection.query(sql,[vehicle.plate_number,vehicle.chassi_number,vehicle.fuel_type,vehicle.factory,vehicle.price,vehicle.made_in,vehicle.service_type,vehicle.made_year,vehicle.cc,vehicle.tyers,vehicle.description,vehicle._condition,vehicle.heavy_light,vehicle.load_type,vehicle.plate_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletevehicle/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM vehicle WHERE plate_number = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});


//reception

router.post('/getreception',(req,res,next)=>{
    let reception = req.body;
mysqlConnection.query('SELECT * FROM reception WHERE service_number = ?  LIMIT 10;',[reception.service_number],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});


router.post('/addreception',(req,res,next)=>{
    let reception = req.body;
    var sql = "INSERT IGNORE INTO reception(service_number,plate_number,refference,date_received,date_finished,service_type,status,fuel_gauge,damage,other) VALUES(?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[reception.service_number,reception.plate_number,reception.refference,reception.date_received,reception.date_finished,reception.service_type,reception.status,reception.fuel_gauge,reception.damage,reception.other],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editreception',(req,res,next)=>{
    let reception = req.body;
    var sql = "UPDATE reception SET  service_number = ? , plate_number = ? , refference = ? ,date_received = ?, date_finished = ?,service_type = ?,status = ?,fuel_gauge = ?,damage = ?,other = ? WHERE service_number = ?;";
    
    mysqlConnection.query(sql,[reception.service_number,reception.plate_number,reception.refference,reception.date_received,reception.date_finished,reception.service_type,reception.status,reception.fuel_gauge,reception.damage,reception.other,reception.service_number],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletereception/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM reception WHERE service_number = ?",[req.params.id],(err,rows,fields)=>{
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
     var sql = "INSERT IGNORE INTO employe(employe_id,title,name,gender,profession,responsibility,department,directorate,division,mastebaberiya,team,level,type,salary,password,birth_date,hire_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[employe.employe_id,employe.title,employe.name,employe.gender,employe.profession,employe.responsibility,employe.department,employe.directorate,employe.division,employe.mastebaberiya,employe.team,employe.level,employe.type,employe.salary,employe.password,employe.birth_date,employe.hire_date],(err,rows,fields)=>{
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
    var sql = "UPDATE employe SET  employe_id = ? , title = ? , name = ? ,gender = ?, profession = ?,responsibility = ?,department = ?,directorate = ? , division = ?,mastebaberiya = ?, team = ?, level = ?, type = ?, salary = ?,password = ?, birth_date =?, hire_date = ? WHERE employe_id = ?;";
    
    mysqlConnection.query(sql,[employe.employe_id,employe.title,employe.name,employe.gender,employe.profession,employe.responsibility,employe.department,employe.directorate,employe.division,employe.mastebaberiya,employe.team,employe.level,employe.type,employe.salary,employe.password,employe.birth_date,employe.hire_date,employe.employe_id],(err,rows,fields)=>{
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

//supplier registration

router.post('/getsupplier',(req,res,next)=>{
    let supplier = req.body;
mysqlConnection.query('SELECT * FROM supplier WHERE supplier_id = ?  LIMIT 10;',[supplier.supplier_id],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});


router.post('/addsupplier',(req,res,next)=>{
    let supplier = req.body;
    var sql = "INSERT IGNORE INTO supplier(name,supplier_id,contact,address,tel1,tel2,website,date) VALUES(?,?,?,?,?,?,?,?);";
    
    mysqlConnection.query(sql,[supplier.name,supplier.supplier_id,supplier.contact,supplier.address,supplier.tel1,supplier.tel2,supplier.website,supplier.date],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});
router.put('/editesupplier',(req,res,next)=>{
    let employe = req.body;
    var sql = "UPDATE supplier SET  name = ? , supplier_id = ? , contact = ? ,address = ?, tel2 = ?,tel2 = ?,website = ?,date = ? WHERE supplier_id = ?;";
    
    mysqlConnection.query(sql,[supplier.name,supplier.supplier_id,supplier.contact,supplier.address,supplier.tel1,supplier.tel2,supplier.website,supplier.date,supplier.supplier_id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
            
        }
    });

});

router.delete('/deletesupplier/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM supplier WHERE supplier_id  = ?",[req.params.id],(err,rows,fields)=>{
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
router.get('/getsuppliers/:starting',(req,res,next)=>{
    //res.send('Retriving contacts')
    let starting = req.params.starting;
    starting = starting+'%'
    
    mysqlConnection.query("SELECT name FROM supplier where name  LIKE ?",starting,(err,rows,fields)=>{
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
router.get('/getplatenumber/:platenumber',(req,res,next)=>{
    //res.send('Retriving contacts')
    let starting = req.params.starting;
    starting = starting+'%'
    
    mysqlConnection.query("SELECT plate_number FROM vehicle where plate_number  LIKE ?",starting,(err,rows,fields)=>{
    if(!err){
       
        res.send(rows);
        
    }
    else{
        res.send(err);
    }
});
});
module.exports = router;