import AppError from "../shared/AppError.js";
import TransactionModel from "../model/TransactionModel.js";

const FindReleasesService = {
    async execute(data) {
        try {
            const { period } = data.query;
            const { name } = data.params;
            let income = 0, outcome = 0;
            let formatter = new Intl.NumberFormat([], {
                style: "currency",
                currency: "BRL",
            });

            if (!period) {
                throw new AppError("query string period is missing!");
            }

            const releases = await TransactionModel.find({
                yearMonth: period,
                description: new RegExp(name, "i"),
            });
            releases.forEach((release) => {
                if (release.type == "+") {
                    income += Number(release.value);
                } else {
                    outcome += Number(release.value);
                }
            });

            console.log(income, outcome);

            let result = {
                length: releases.length,
                income: formatter.format(income),
                outcome: formatter.format(outcome),
                total: formatter.format(income - outcome),
                transactions: releases,
            };

            return result;
        } catch (error) {
            console.log(error);
            throw new AppError(error.message, 500);
        }
    },
};

export default FindReleasesService;
