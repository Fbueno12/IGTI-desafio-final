import AppError from "../shared/AppError.js";
import TransactionModel from "../model/TransactionModel.js";

const CreateReleaseService = {
    async execute(data) {
        try {
            let release = data.body;
            release.yearMonth = `${release.year}-${padNumber(release.month)}`;
            release.yearMonthDay = `${release.year}-${padNumber(release.month)}-${padNumber(release.day)}`;

            const obj = await TransactionModel.create(release);
            obj.save();

            return obj;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500);
        }
    },
};

function padNumber(number) {
    number = Number(number);
    if (number < 10) {
        number = "0" + number;
    }

    return number
}

export default CreateReleaseService;
