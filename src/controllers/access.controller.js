'use strict';
const AccessService = require('../services/access.service');
class AccessController {
    static signUp =  async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);
            // const { username, email, password } = req.body;
            // const result = await AccessService.signUp({ username, email, password });

            // if (result.status === 'error') {
            //     return res.status(400).json(result);
            // }

            // return res.status(201).json({
            //     code: '20000',
            //     message: 'User registered successfully',
            //     metadata: { userId: result.userId }
            // });

            return res.status(201).json(await AccessService.signUp(req.body));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AccessController;
