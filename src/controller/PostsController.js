const postModel = require("../models/PostModel");
const menuModel = require("../models/MenuModel");

function getPostType(slug_postType) {
    return menuModel.findOne({ slug: slug_postType }).lean();
}

function getPostType_2(parentID, slug_postType) {
    return menuModel
        .findOne({ slug: slug_postType, parentID: parentID })
        .lean();
}

function getPost(slug_post) {
    return postModel.findOne({ slug: slug_post }).lean();
}

function getPosts(postTypeID) {
    return postModel.find({ parentID: postTypeID }).lean();
}

class PostsController {
    index(req, res, next) {
        postModel
            .find({})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json("error: ", error));
    }

    // [GET] /posts/full
    fullPosts(req, res, next) {
        const menusPromise = menuModel.find({});
        const postsPromise = postModel.find({});
        Promise.all([menusPromise, postsPromise])
            .then(([menusData, postsData]) => {
                const customPostsData = postsData.map((item, index) => {
                    const postTypeName = menusData.filter(
                        (menu) => menu._id == item.parentID
                    )[0].name;
                    const finalData = {
                        ...item._doc,
                        postTypeName: postTypeName,
                        index: index + 1,
                    };
                    return finalData;
                });
                res.status(200).json(customPostsData);
            })
            .catch((error) => res.status(500).json(error));
    }

    // [GET] /posts/:parent/:slug
    postsForTypeFull(req, res, next) {
        const slug_parent = req.params.parent;
        const slug_postType = req.params.slug;

        getPostType(slug_parent)
            .then((data) => getPostType_2(data._id.toString(), slug_postType))
            .then((data) => getPosts(data._id.toString()))
            .then((data) => res.status(200).json(data));
    }

    // [GET] /posts/:parent/:type/:slug
    postDetailFull(req, res, next) {
        const slug_parent = req.params.parent;
        const slug_postType = req.params.type;
        const slug = req.params.slug;

        getPostType(slug_parent)
            .then((data) => getPostType_2(data._id.toString(), slug_postType))
            .then((data) => getPost(slug))
            .then((data) => res.status(200).json(data));
    }

    // [GET] /posts/:slug
    postsForType(req, res, next) {
        const slug_postType = req.params.slug;
        const postTypeID = getPostType(slug_postType);
        if (postTypeID) getPosts(postTypeID);
        else res.json({ error: "không tim thay" });
    }

    // [GET] /posts/:type/:slug
    postDetail(req, res, next) {
        const slug_postType = req.params.type;
        const slug_post = req.params.slug;
        const postTypeID = getPostType(slug_postType);
        if (postTypeID) getPost(slug_post);
        else res.status(500).json({ error: "không tìm thấy" });
    }

    // [POST] /posts/store
    storePost(req, res, next) {
        const postData = req.body;
        const newPost = new postModel(postData);
        newPost
            .save()
            .then((result) => res.status(200).json("success"))
            .catch((error) => res.status(500).json("error: ", error));
    }

    // [GET] /posts/edit/:slug
    editPost(req, res, next) {
        const postID = req.params.slug;
        postModel
            .findById(postID)
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json("error: ", error));
    }

    // [PUT] /posts/:slug
    updatePost(req, res, edit) {
        const postId = req.params.slug;
        const postData = req.body;
        postData.slug = postData.title.toLowerCase().trim().split(' ').join('-');
        postModel
            .updateOne({ _id: postId }, postData)
            .then((result) => res.status(200).redirect('back'))
            .catch((error) => res.status(500).json("error: ", error));
    }

    // [DELETE] /posts/:slug
    deletePost(req, res, next) {
        const postID = req.params.slug;
        postModel
            .findByIdAndDelete(postID)
            .then((result) => res.status(200).json("success"))
            .catch((error) => res.status(500).json("error: ", error));
    }

    postByID(req, res, next) {
        const postID = req.query.q;
        postModel
            .findById(postID)
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json({ error: error }));
    }
}

module.exports = new PostsController();
