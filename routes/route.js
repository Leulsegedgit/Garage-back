const express = require('express');
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
router.post('/getstore',(req,res,next)=>{
    let store = req.body;
mysqlConnection.query('SELECT * FROM store WHERE request_number = ? || service_number = ? || requester = ? || approver = ? || date = ? LIMIT 10;',[store.request_number,store.service_number,store.requester,store.approver,store.date],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        
    }
    else{
       
    }
});
});

router.post('/getdriver',(req,res,next)=>{
    let driver = req.body;
    console.log(driver)
mysqlConnection.query('SELECT * FROM drivers WHERE id = ?;',[driver.id],(err,rows,fields)=>{
    if(!err){
        res.send(rows);
        console.log(rows);
        
    }
    else{
        console.log(err);
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
router.delete('/deletestore/:id',(req,res,next)=>{
    mysqlConnection.query("DELETE  FROM store WHERE request_number = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    });
});

router.post('/getuser',(req,res,next)=>{
    let usr = req.body;
    var sql = "SELECT * FROM users WHERE  first_name = ? && password = ? ";
    mysqlConnection.query(sql,[usr.first_name,usr.password],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
            
        }
        else{
            res.send(err);
        }
    });

});
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
router.post('/addstore',(req,res,next)=>{
    let store = req.body;
    var sql = "INSERT IGNORE INTO store(request_number,service_number,requester,approver,date) VALUES(?,?,?,?,?);";
    
    mysqlConnection.query(sql,[store.request_number,store.service_number,store.requester,store.approver,store.date],(err,rows,fields)=>{
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

module.exports = router;