// How to set up a global middleware error handler: https://medium.com/@mohsinogen/simplified-guide-to-setting-up-a-global-error-handler-in-express-js-daf8dd640b69

import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err.stack);
	res.status(500).json({ error: err.message });
};
