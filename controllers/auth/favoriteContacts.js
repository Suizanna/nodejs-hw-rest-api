const { Contact } = require('../../models')

const favoriteContacts = async (req, res) => {
  const query = req.query.favorite
  const userById = req.user._id

  const contacts = await Contact.find({ owner: userById })

  const contactsFavorite = contacts.filter(
    ({ favorite }) => query === `${favorite}`,
  )
  console.log(contactsFavorite)
  res.json({
    status: 'success',
    code: 200,
    result: {
      contactsFavorite,
    },
  })
}

module.exports = favoriteContacts