router.get('/:commentId', async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findByPk(commentId, {
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Post, attributes: ['id', 'title'] }
      ]
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// add another endpoint for deleting a comment
router.delete('/:commentId', async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const deleted = await Comment.destroy({ where: { id: commentId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});// add an endpoint for getting a specific comment by ID