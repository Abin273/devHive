import express from 'express';

import { otpControllers } from '../../../controllers';
import { IDependency } from '../../types/dependency';

export const otpRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const otpController = otpControllers(dependencies);

    router.post('/sendOtp', otpController.sendOtp);

    router.post('/verify-forgotPassword-otp', otpController.verifyOtp);

    return router;
};
