const menuController=require('../app/controllers/MenuController')
const createController= require('../app/controllers/CreateController')
const searchController= require('../app/controllers/SearchController')
const siteController= require('../app/controllers/SiteController')
const loginController= require('../app/controllers/LoginController')
const jwt=require('jsonwebtoken')

function route(app)
{
            app.get('/',siteController.index)
            // GET login
            app.get('/login',loginController.render)
            //POST login
            app.post('/login',loginController.checkAndSendToken)
            app.post('/logout',loginController.logout)

            app.use(loginController.checkToken)

            app.post('/food',createController.food)
            app.post('/drink',createController.drink)
            app.get('/create/drink',createController.showCreateDrink)
            app.get('/create/food',createController.showCreateFood)


            app.post('/search/menu',menuController.index)
            app.get('/:mamon/detail',menuController.showDetail)

            app.post('/revenue/show',searchController.show)
            app.get('/revenue/search',searchController.index)
            
        
            //GET private
            app.get('/private',)

}

module.exports = route