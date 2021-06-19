const sequelize = require("../config/connection");
const { User, Park, Note, Log } = require("../models");
const userSeedData = require("./userSeedData.json");
const parkSeedData = require("./parkSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const user = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const park of parkSeedData) {
    const newPark = await Park.create({
      ...park,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const user of userSeedData) {
    const newUser = await User.create({
      ...user,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};
seedDatabase();
