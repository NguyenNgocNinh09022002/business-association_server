const MenuModel = require('../models/MenuModel');
const postsModel = require('../models/PostModel')

class SearchController {


    
    
    index(req, res, next) {
        const queryStr = req.query.q.toLowerCase();

        const menuPromise = MenuModel.find({}).lean()
        const postPromise =postsModel.find({}).lean()
        Promise.all([menuPromise, postPromise])
        .then(async ([menu,data]) => {
            
            if(!(data.length >0)) {
                res.json([]);
            }
            let dataPost =  data.filter(item => { return (item.title.toLowerCase().indexOf(queryStr) != -1 || item.content.toLowerCase().indexOf(queryStr) != -1) ? true : false})
            dataPost =  dataPost.map( post => {
                const menuParent =  menu.filter((item, index) => item._id == post.parentID)
                return {...post, menuSlug: menuParent[0].slug}
            })
            res.json(dataPost)

        }).catch(error => res.status(500).json(error))
    }
}

module.exports = new SearchController;
