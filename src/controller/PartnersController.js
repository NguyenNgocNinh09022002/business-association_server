const partners = require("../models/PartnerModel");
class PartnersController {
    index(req, res, next) {
        partners
            .find({})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json({"error: ": error}));
    }

    // [GET] /partners/:slug
    partnerDetail(req, res, next) {
        const slug_web = req.params.slug;
        partners
            .findOne({ slug: slug_web })
            .lean()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json({ error: error }));
    }

    // [POST] /partners/store
    storePartner(req, res, next) {
        const partnerData = req.body;
        const newPartner = new partners(partnerData);
        newPartner
            .save()
            .then((result) => res.status(200).json("success"))
            .catch((error) => res.status(500).json({ error }));
    }

    // [PUT] /partners/:slug
    updatePartner(req, res, next) {
        const partnerID = req.params.slug;
        const partnerData = req.body;
        partners
            .findByIdAndUpdate(partnerID, partnerData)
            .then((result) => res.status(200).json("success"))
            .catch((error) => res.status(500).json({ error }));
    }

    // [DELETE] /partners/:slug
    deletePartner(req, res, next) {
        const partnerID = req.params.slug;
        partners
            .findByIdAndDelete(partnerID)
            .then((result) => res.status(200).json("success"))
            .catch((error) => res.status(500).json({ error }));
    }
}

module.exports = new PartnersController();
