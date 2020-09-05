import FindReleaseByNameService from "../services/FindReleasesService.js";
import CreateReleaseService from "../services/CreateReleaseService.js";
import UpdateReleaseService from "../services/UpdateReleaseService.js";
import DeleteReleaseService from "../services/DeleteReleaseService .js";

const ReleaseController = {

    async find(request, response) {
        const releases = await FindReleaseByNameService.execute(request);
        return response.json(releases);
    },

    async store(request, response) {
        const release = await CreateReleaseService.execute(request);
        return response.json(release);
    },

    async update(request, response) {
        const release = await UpdateReleaseService.execute(request);
        return response.json(release);
    },

    async delete(request, response) {
        await DeleteReleaseService.execute(request);
        return response.status(204).send();
    }
};

export default ReleaseController;
