const paginateResult = (model, options = {
  where: {},
  select: {}
}) => {
  return async (req, res) => {
    try {
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let page = req.query.page ? parseInt(req.query.page) : 1;

      let offset = limit * page - limit;

      let search = req.where;
      let data = await model
        .find({
          $or: search
        })
        .limit(limit)
        .skip(offset)
        .select(
          typeof options.select === 'string' ? options.select : { ...options.select }
        );
      let meta = {
        total: await model.count(),
        per_page: limit,
        links: [],
      };
      let total_pages = 0;
      if (meta.total > 0) {
        total_pages =
          parseInt(meta.total / meta.per_page) < meta.total / meta.per_page
            ? meta.total / meta.per_page + 1
            : meta.total / meta.per_page;
      }

      let url = new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );

      for (let i = 1; i <= total_pages; i++) {
        var search_params = url.searchParams;

        // new value of "id" is set to "101"
        search_params.set("page", i);

        // change the search property of the main url
        url.search = search_params.toString();

        meta.links.push({
          label: i,
          active: i == page,
          url: url.toString(),
        });
      }

      let links = {
        first: meta.links[0] ? meta.links[0].url : null,
        last: meta.links.at(-1) ? meta.links.at(-1).url : null,
        prev: meta.links[page - 1 - 1] ? meta.links[page - 1 - 1].url : null,
        next: meta.links[page] ? meta.links[page].url : null,
      };

      return res.json({
        data,
        links,
        meta,
      });

      // next();
    } catch (e) {
      res.status(e.code ?? 500).json({ message: e.message });
    }
  };
};

export default paginateResult;
