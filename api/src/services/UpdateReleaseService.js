import AppError from "../shared/AppError.js";
import TransactionModel from "../model/TransactionModel.js";

const UpdateReleaseService = {
    async execute(data) {
        try {
            const { id } = data.params;
            const obj = await TransactionModel.findByIdAndUpdate(
                id,
                data.body,
                { new: true }
            );

            return obj;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500);
        }
    },
};

export default UpdateReleaseService;
