const Contact = require('../Model/Contact');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.getById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContact =  async(req, res) => {
  try {
    const { name, firstName, email, phoneNumber, message, subject } = req.body;
    console.log('Received data:', { name, firstName, email, phoneNumber, message, subject });

    const contact = await Contact.create({ name, firstName, email, phoneNumber, message, subject });
    console.log("message",contact);
    
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, firstName, email, phoneNumber, message, subject } = req.body;
    console.log(name, firstName, email, phoneNumber, message, subject );
    
    const contact = await Contact.update(id, { name, firstName, email, phoneNumber, message, subject });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.delete(id);
    if (contact) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
