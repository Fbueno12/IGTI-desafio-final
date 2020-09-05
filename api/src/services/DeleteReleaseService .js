import AppError from "../shared/AppError.js";
import TransactionModel from "../model/TransactionModel.js";

const DeleteReleaseService = {
    async execute(data) {
        try {
            const { id } = data.params;
            await TransactionModel.findByIdAndDelete(id);

            return { message: "Transaction deleted successfully" };
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500);
        }
    },
};

export default DeleteReleaseService;
