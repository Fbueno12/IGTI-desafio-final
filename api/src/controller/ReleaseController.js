import FindReleaseByNameService from "../services/FindReleasesService.js";

const ReleaseController = {

    async find(request, response) {
        const releases = await FindReleaseByNameService.execute(request);

        return response.json({length: releases.length,transactions: releases});
    },

    async store(request, response) {
        return response.json({ ok: "ReleaseController works!" });
    },
};

export default ReleaseController;
