import express from 'express';
import * as characterController from '../controllers/characterController';

const router = express.Router();

router.post('/deal-damage', characterController.dealDamage);
router.post('/heal', characterController.heal);
router.post('/add-temporary-hit-points', characterController.addTemporaryHitPoints);

export default router;
