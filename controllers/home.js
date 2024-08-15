const ITEMS_PER_PAGE = 3;

module.exports = {
    async home(req, res) {
        let allGarments = await req.storage.getAllGarments(req.query);

        let page = Number(req.query.page || 1);
        if (page <= 0) {
            page = 1;
        }

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const slicedItems = allGarments.slice(startIndex, endIndex);

        const totalPages = Math.ceil(allGarments.length / ITEMS_PER_PAGE);

        const isTherePreviuosPage = (page - 1) > 0;
        const isThereNextPage = ITEMS_PER_PAGE * page < allGarments.length;

        let finalItems;
        let mustHaveNextOrPrevious = true;

        if (req.query.search || req.query.from || req.query.to) {
            mustHaveNextOrPrevious = false;
            finalItems = allGarments;
        } else {
            mustHaveNextOrPrevious = true;
            finalItems = slicedItems;
        }

        res.render('index', {
            garments: finalItems,
            query: req.query,
            currentPage: page + 1,
            previousPage: page - 1,
            totalPages,
            isTherePreviuosPage,
            isThereNextPage,
            mustHaveNextOrPrevious,
            title: 'Мода Лукс'

        });
    }
}