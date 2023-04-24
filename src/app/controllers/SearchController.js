const connection = require("../../config/db");
const path=require("path")
const QUERY = require("../models/Query")
class SearchController{
    index(req,res)
    {
        res.sendFile(path.join(__dirname,'../../resource/views/revenue/revenue.html'))
        

    }
    show(req,res)
    {
        async function show()
        {
             await connection.query(QUERY.CALL_THONGKEDOANHTHU,req.body.year)
             .then((result)=>{
                var revenue=result[0][0]
                res.render('./revenue/afterRevenue',{revenue})
             })
             .catch((err)=>{
                res.sendFile(path.join(__dirname,'../../resource/views/revenue/revenueError.html'))
             })

          //  res.redirect('/nam');

        }
        show()
    }
}

module.exports=new SearchController()