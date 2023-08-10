export default function validateRole(roles) {
    return async (req, res, next) => {
        try {
            if (roles.includes(req.user.role)) {
                next();
            } else {
                throw { message: 'UNAUTHORIZED_ROLE' };
            }
        } catch (err) {
            return res.status(400).json({ status: false, message: err.message });
        }
    }
}

