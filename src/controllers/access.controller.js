'use strict';
const AccessService = require('../services/access.service');
class AccessController {
    static signUp =  async (req, res, next) => {
        try {

            const { username, email, password } = req.body;

            console.log(`[P]::signUp::`, req.body);
            if (!username || !email || !password) {
                return res.status(400).json({
                    code: '40001',
                    message: 'Username, email, and password are required',
                    status: 'error'
                });
            }
            const result = await AccessService.signUp({ username, email, password });

            // Handle any error that might come from the service
            if (result.status === 'error') {
                return res.status(400).json(result);
            }

            // Send success response
            return res.status(201).json({
                code: '20000',
                message: 'User registered successfully',
                metadata: {
                    shop: result.metadata.shop,
                    tokens: result.metadata.tokens
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AccessController;
