import AppError from "../shared/AppError.js";
import TransactionModel from "../model/TransactionModel.js";

const FindReleasesService = {
    async execute(data) {
        try {
            const { period } = data.query;
            const { name } = data.params;
            if(!period) {
                throw new AppError("query string period is missing!");
            }

            const releases = await TransactionModel.find({
                yearMonth: period,
                description: new RegExp(name, "i"),
            });

            return releases;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500);
        }
    },
};

export default FindReleasesService;
