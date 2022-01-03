const router = require('express').Router();

const { 
    allThoughts, 
    getThoughtsId, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-control');


router.route('/').get(allThoughts);
router.route('/:id').get(getThoughtsId).put(updateThought).delete(deleteThought); 
router.route('/:userId').post(createThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;