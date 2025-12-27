import express from "express";
import { addToWatchlist , removeFromWatchlist, updateWatchlist} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/", addToWatchlist);

//{{baseUrl}}/watchlist/:id
router.delete("/:id", removeFromWatchlist)

router.put("/:id",updateWatchlist)


export default router;