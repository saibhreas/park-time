const User = require("./user");
const Park = require("./park");

User.hasMany(Park, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Park.belongsTo(User, {
  foreignKey: "user_id",
});


module.exports = { User, Park };
