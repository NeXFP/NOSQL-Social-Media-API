const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThought, 
    // updateThought,
    // deleteThought,
    addReactions,
    deleteReactions

} = require('../../controllers/thought-control');


router.route('/').get(getAllThoughts);
router.route('/:id').get(getThoughtsById)/*.put(updateThought)*//*.delete(deleteThought); */
router.route('/:userId').post(createThought);
router.route('/:thoughtId/reactions').post(addReactions);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);

module.exports = router;