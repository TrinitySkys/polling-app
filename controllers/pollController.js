const { Poll } = require('../models');

module.exports = {
  listPolls: async (req, res) => {
    const polls = await Poll.findAll();
    res.render('index', { polls });
  },

  getCreatePoll: (req, res) => {
    res.render('createPoll');
  },

  postCreatePoll: async (req, res) => {
    const { question, options } = req.body;
    const pollOptions = options.split(',').map(opt => opt.trim());

    await Poll.create({ question, options: JSON.stringify(pollOptions), votes: '{}' });
    res.redirect('/');
  },

  getPoll: async (req, res) => {
    const poll = await Poll.findByPk(req.params.id);
    if (!poll) return res.status(404).send("Poll not found");
    
    const pollData = {
      ...poll.dataValues,
      options: JSON.parse(poll.options),
      votes: JSON.parse(poll.votes || '{}')
    };
    res.render('poll', { poll: pollData });
  },

  postVote: async (req, res) => {
    const poll = await Poll.findByPk(req.params.id);
    if (!poll) return res.status(404).send("Poll not found");

    const votes = JSON.parse(poll.votes || '{}');
    const selectedOption = req.body.option;

    votes[selectedOption] = (votes[selectedOption] || 0) + 1;

    await poll.update({ votes: JSON.stringify(votes) });

    res.redirect(`/polls/${poll.id}`);
  }
};
