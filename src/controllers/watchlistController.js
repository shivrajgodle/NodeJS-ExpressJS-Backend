import { prisma } from "../config/db.js"


const addToWatchlist = async (req , res) => {
    const {movieId , status , rating , notes} = req.body

    //verify movie exists
    const movie = await prisma.movie.findUnique({
        where : {id: movieId},
    });

    if(!movie){
        return res.status(404).json({error : "Movie not found"});
    }

    //Check if already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where : {
            userId_movieId: {
                userId : req.user.id,
                movieId: movieId
            }
        }
    });

    if(existingInWatchlist){
        return res.status(400).json({error : "Movie already in watchlist"});
    }

    const watchlistItem = await prisma.watchlistItem.create(
        {
            data : {
                userId: req.user.id,
                movieId,
                status: status || "PLANNED",
                rating,
                notes
            },
        });

        res.status(201).json({
            status : "Success",
            data: {
                watchlistItem,
            },
        });
}


/**
 * Remove movie from watchlist
 * Deletes watchlist item
 * Ensures only owner can delete
 * Requires protect middleware
 */
const removeFromWatchlist = async (req , res) => {
    
    //Find watchlist item and verify ownership 
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where : {id : req.params.id},
    })

    if(!watchlistItem){
        return res.status(401).json({error : "Watchlist item not found"});
    }

    //Ensure only owner can delete
    if(watchlistItem.userId !== req.user.id){
        return res.status(403).json({error : "Not allowed to update this watchlist item"});
    }

    await prisma.watchlistItem.delete({
        where : {id : req.params.id},
    })

    res.status(200).json({
        status : "success",
        message : "Movie removed from watchlist",
    })


}

export { addToWatchlist , removeFromWatchlist}