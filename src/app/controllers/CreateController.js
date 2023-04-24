// var { connection } = require("../../config/db");
const path=require('path')
const connection = require("../../config/db");
const QUERY = require("../models/Query")

class CreateController {
  showCreateDrink(req,res){
    res.sendFile(path.join(__dirname,'../../resource/views/create/show/createDrink.html'))
  }
  
  
  drink(req, res) {
    var newSize=0;
    console.log(req.body);
    
   async function createDrink()
   {  
    var result = await connection.query(QUERY.SELECT_KTNU)
    console.log(result[0]);
    for(var i=0;i<result[0].length;i++)
    {
            if(result[0][i].MaNuocUong==req.body.mamon && result[0][i].Size!=req.body.size)
            {
              newSize=1;
            }
    }
    console.log('newSize = ' + newSize);
    if(newSize==0)
    {
           await connection.query(QUERY.INSERT_MONAN,[req.body.mamon,req.body.ten,req.body.hinh,req.body.manhom])
              .then(()=>{
                console.log("i am here");
                res.sendFile(path.join(__dirname,'../../resource/views/create/success/createSuccess.html'))
              }
                )
              .catch((err)=>{
                res.sendFile(path.join(__dirname,'../../resource/views/create/fail/createDFail.html'))

              })

            connection.query(
              QUERY.INSERT_NUOCUONG,req.body.mamon
            );
            connection.query(
              QUERY.INSERT_KTNC, [req.body.mamon,req.body.size,req.body.dongia]
            );
    }
    else
    {
            connection.query(
              `INSERT INTO KichThuoc_NuocUong VALUES ('${req.body.mamon}', '${req.body.size}','${req.body.dongia}') `
            )
            .then(()=>{
              res.sendFile(path.join(__dirname,'../../resource/views/create/success/createSuccess.html'))
            }
              )
            .catch((err)=>{
              res.sendFile(path.join(__dirname,'../../resource/views/create/fail/createDFail.html'))


            
            }
              
              )
            ;
    }
          
   }

   createDrink()

   }
   
   showCreateFood(req,res){
    res.sendFile(path.join(__dirname,'../../resource/views/create/show/createFood.html'))

  }
  
  food(req, res) {
    async function createFood(){
    var newTime=0;
    var result = await connection.query(QUERY.SELECT_SERVING)
    console.log(result[0]);
    for(var i=0;i<result[0].length;i++)
    {
            if(result[0][i].MaDoAn==req.body.mamon && result[0][i].BatDau!=req.body.batdau)
            {
              newTime=1;
            }
    }

    if(newTime==0)
    {
          await  connection.query(QUERY.INSERT_MONAN,[req.body.mamon,req.body.ten,req.body.hinh,req.body.manhom])
              .then(()=>{
                res.sendFile(path.join(__dirname,'../../resource/views/create/success/createSuccess.html'))

              })
              .catch((err)=>{
                res.sendFile(path.join(__dirname,'../../resource/views/create/fail/createFFail.html'))
              }
                )

          await  connection.query(
              QUERY.INSERT_DOAN,[req.body.mamon,req.body.dongia]
            );
            connection.query(
              QUERY.INSERT_SERVING,[req.body.mamon,req.body.batdau,req.body.ketthuc]
            );
    }
    else
    {
            connection.query(
              QUERY.INSERT_SERVING,[req.body.mamon,req.body.batdau,req.body.ketthuc]
            )
            .then(()=>{
              res.sendFile(path.join(__dirname,'../../resource/views/create/success/createSuccess.html'))

            }
              )
            .catch((err)=>{
              res.sendFile(path.join(__dirname,'../../resource/views/create/fail/createFFail.html'))

            })
            ;
    }
  }
  createFood()
}}


module.exports = new CreateController();
