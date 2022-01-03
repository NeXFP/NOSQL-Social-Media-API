const router = require('express').Router();
const {
    AllUsers,
    getUserIds,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriends,
    deleteFriends
  } = require('../../controllers/users-controller');


router.route('/').get(AllUsers).post(createUsers);
router.route('/:id').get(getUserIds).put(updateUsers).delete(deleteUsers);
router.route('/:id/friends/:friendId').post(addFriends).delete(deleteFriends)

module.exports = router; 