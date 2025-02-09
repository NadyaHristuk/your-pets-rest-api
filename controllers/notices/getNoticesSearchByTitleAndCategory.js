const { NotFound } = require('http-errors');
const Notice = require('../../models/notice');
// const User = require('../../models/user');

const getNoticesSearchByTitleAndCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 12, q = '' } = req.query;
        const skip = (page - 1) * limit;

        console.log('req.params', req.params);
        console.log('req.query', req.query);

        const searchWords = q.trim().split(' ');
        const regex = new RegExp(searchWords, 'i');

        const total = await Notice.countDocuments({
            $and: [{ category }, { title: regex }],
        });

        const notices = await Notice.find({
            $and: [{ category }, { title: regex }],
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'owner',
                select: 'email phone',
            });

        if (notices.length === 0) {
            throw new NotFound(`There are no notices for this requestQQQQQQQQ`);
        }

        const totalPages = Math.ceil(total / limit);

        res.json({
            notices,
            total,
            totalPages,
            currentPage: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getNoticesSearchByTitleAndCategory;
