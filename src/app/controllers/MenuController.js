const connection = require("../../config/db");
const QUERY = require("../models/Query")
class MenuController{
    index(req,res)
    {
        async function menu()
        {
            var result= await connection.query(QUERY.SELECT_MONAN_TENMON, req.body.TenMon)
            var courses=result[0]
                res.render('afterSearch',{courses})
          //  res.redirect('/nam');

        }
        menu()
    }
    showDetail(req,res)
    {
        async function showDetail()
        {
                var manyDish = await connection.query(QUERY.SELECT_MONAN_MAMON,req.params.mamon)
                var dish=manyDish[0];
                var orderInMonth=await connection.query(QUERY.SELECT_TONGSL_THANG, req.params.mamon)
                orderInMonth=orderInMonth[0]
                console.log(orderInMonth);
                if(req.params.mamon[0]=='F'){
                            var manyTime=await connection.query(QUERY.SELECT_SERVING_MADOAN,req.params.mamon)
                            var time=manyTime[0]
                            var prices=await connection.query(QUERY.SELECT_DOAN_MAMON,req.params.mamon)
                            var price=prices[0];
                            res.render('./details/food',{dish,price,time,orderInMonth})
                }

                else{
                    var manySizeAndPrice=await connection.query(QUERY.SELECT_KTNC_MANUOCUONG,req.params.mamon)
                    var sizeAndPrice=manySizeAndPrice[0]
                    res.render('./details/drink',{dish,sizeAndPrice,orderInMonth})
                }
              
                  
        }
        showDetail()
    }
}

module.exports=new MenuController()