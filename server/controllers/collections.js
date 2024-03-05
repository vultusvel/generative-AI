const User = require("../models/User");

const collections = async (req, res) => {
  try {
    const { data, user } = req.body;
    const username = user.userData.username;
    const userMongo = await User.findOne({ username });
    const updatedCollections = [];

    userMongo.userCollections.forEach((collection) => {
      const newData = data.find(
        (el) => el.collectionId === collection.collectionId
      );
      if (newData) {
        updatedCollections.push(newData);
      } else {
        updatedCollections.push(collection);
      }
    });
    data.forEach((el) => {
      if (
        !userMongo.userCollections.find(
          (collection) => collection.collectionId === el.collectionId
        )
      ) {
        updatedCollections.push(el);
      }
    });
    userMongo.userCollections = updatedCollections;
    await userMongo.save();

    console.log(updatedCollections);
    return res.status(201).json({
      message: "Collection added successfully",
      userCollections: userMongo.userCollections,
    });
  } catch (error) {
    console.error("Error getting user collections:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = collections;
