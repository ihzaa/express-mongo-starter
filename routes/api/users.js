import UserController from "../../controllers/api/UserController.js";
import returnOnError from "../../middlewares/returnOnError.js";
import paginateResult from "../../middlewares/paginateResult.js";
import user from '../../models/User.js';
import userValidation from '../../middlewares/validators/api/users.js';
import findOrFail from '../../middlewares/findOrFail.js'
import validateToken from '../../middlewares/JWTAuthMiddleware.js';
import validateRole from '../../middlewares/roleMiddleware.js';

const baseRoute = "/api/users";

export default function (app) {
    // GET
    app.get(baseRoute + "/",
        validateToken,
        validateRole(['admin']),
        (req, res, next) => {
            let search = req.query.search;
            let where = [];
            if (search) {
                let select = 'full_name email role'.split(" ");
                select.forEach(s => {
                    let obj = {};
                    obj[s] = { '$regex': search }
                    where.push(obj);
                });
            }
            req.where = where;
            next();
        },
        paginateResult(user, {
            select: '_id full_name email role',
        }));

    app.post(
        baseRoute,
        validateToken,
        validateRole(['admin']),
        userValidation.store,
        returnOnError,
        UserController.store
    );

    app.put(
        baseRoute + '/:id',
        validateToken,
        validateRole(['admin']),
        userValidation.update,
        returnOnError,
        UserController.update
    );

    app.get(
        baseRoute + '/:id',
        validateToken,
        validateRole(['admin']),
        findOrFail(user, {
            select: '_id full_name email role status',
        }),
        UserController.show
    );

    app.delete(
        baseRoute + '/:id',
        validateToken,
        validateRole(['admin']),
        findOrFail(user, {
            select: '_id',
        }),
        UserController.destroy
    );
};
