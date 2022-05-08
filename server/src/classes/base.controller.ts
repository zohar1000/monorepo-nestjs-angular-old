import { ServerResponse } from '@shared-stack/models/server-response.model';

export class BaseController {

	returnSuccess(data?): ServerResponse {
		return { isSuccess: true, data };
	}

	returnError(error): ServerResponse {
		return { isSuccess: false, error: { message: error.message } };
	}
}