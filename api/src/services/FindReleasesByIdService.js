import AppError from "../shared/AppError.js";
import TransactionModel from "../model/TransactionModel.js";

const FindReleasesByIdService = {
    async execute(data) {
        try {
            const { id } = data.params;
            const result = await TransactionModel.findById(id);

            return result;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500);
        }
    },
};

export default FindReleasesByIdService;
