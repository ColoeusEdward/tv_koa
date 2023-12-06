var DataTypes = require("sequelize").DataTypes;
var _credit_detail = require("./credit_detail");
var _ddd = require("./ddd");
var _lost_article = require("./lost_article");
var _lost_post = require("./lost_post");
var _notify = require("./notify");
var _notify_user_relation = require("./notify_user_relation");
var _private_chat_detail = require("./private_chat_detail");
var _private_chat_relation = require("./private_chat_relation");
var _prize = require("./prize");
var _prize_order = require("./prize_order");
var _role = require("./role");
var _user = require("./user");
var _user_credit = require("./user_credit");
var _user_lost_collect = require("./user_lost_collect");
var _user_lost_history = require("./user_lost_history");
var _user_role_relation = require("./user_role_relation");
var _user_subpost = require("./user_subpost");
var _user_subscr_class = require("./user_subscr_class");

function initModels(sequelize) {
  var credit_detail = _credit_detail(sequelize, DataTypes);
  var ddd = _ddd(sequelize, DataTypes);
  var lost_article = _lost_article(sequelize, DataTypes);
  var lost_post = _lost_post(sequelize, DataTypes);
  var notify = _notify(sequelize, DataTypes);
  var notify_user_relation = _notify_user_relation(sequelize, DataTypes);
  var private_chat_detail = _private_chat_detail(sequelize, DataTypes);
  var private_chat_relation = _private_chat_relation(sequelize, DataTypes);
  var prize = _prize(sequelize, DataTypes);
  var prize_order = _prize_order(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_credit = _user_credit(sequelize, DataTypes);
  var user_lost_collect = _user_lost_collect(sequelize, DataTypes);
  var user_lost_history = _user_lost_history(sequelize, DataTypes);
  var user_role_relation = _user_role_relation(sequelize, DataTypes);
  var user_subpost = _user_subpost(sequelize, DataTypes);
  var user_subscr_class = _user_subscr_class(sequelize, DataTypes);

  user.belongsToMany(notify, { through: notify_user_relation, foreignKey: "user_id", otherKey: "notify_id" });
  notify.belongsToMany(user, { through: notify_user_relation, foreignKey: "notify_id", otherKey: "user_id" });
  lost_article.belongsToMany(user, { through: user_lost_collect, foreignKey: "lost_id", otherKey: "user_id" });
  user.belongsToMany(lost_article, { through: user_lost_collect, foreignKey: "user_id", otherKey: "lost_id" });
  role.belongsToMany(user, { through: user_role_relation, foreignKey: "role_id", otherKey: "user_id" });
  user.belongsToMany(role, { through: user_role_relation, foreignKey: "user_id", otherKey: "role_id" });
  credit_detail.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(credit_detail, { foreignKey: "user_id"});
  lost_article.belongsTo(user, { foreignKey: "found_user_id"});
  user.hasMany(lost_article, { foreignKey: "found_user_id"});
  lost_article.belongsTo(user, { foreignKey: "lost_user_id"});
  user.hasMany(lost_article, { foreignKey: "lost_user_id"});
  lost_post.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(lost_post, { foreignKey: "user_id"});
  notify_user_relation.belongsTo(notify, { foreignKey: "notify_id"});
  notify.hasMany(notify_user_relation, { foreignKey: "notify_id"});
  notify_user_relation.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(notify_user_relation, { foreignKey: "user_id"});
  private_chat_detail.belongsTo(user, { foreignKey: "from_user_id"});
  user.hasMany(private_chat_detail, { foreignKey: "from_user_id"});
  private_chat_relation.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(private_chat_relation, { foreignKey: "user_id"});
  private_chat_relation.belongsTo(user, { foreignKey: "another_user_id"});
  user.hasMany(private_chat_relation, { foreignKey: "another_user_id"});
  prize_order.belongsTo(prize, { foreignKey: "prize_id"});
  prize.hasMany(prize_order, { foreignKey: "prize_id"});
  prize_order.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(prize_order, { foreignKey: "user_id"});
  user_credit.belongsTo(user, { foreignKey: "user_id"});
  user.hasOne(user_credit, { foreignKey: "user_id"});
  user_lost_collect.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(user_lost_collect, { foreignKey: "user_id"});
  user_lost_collect.belongsTo(lost_article, { foreignKey: "lost_id"});
  lost_article.hasMany(user_lost_collect, { foreignKey: "lost_id"});
  user_lost_history.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(user_lost_history, { foreignKey: "user_id"});
  user_lost_history.belongsTo(lost_article, { foreignKey: "lost_id"});
  lost_article.hasMany(user_lost_history, { foreignKey: "lost_id"});
  user_role_relation.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(user_role_relation, { foreignKey: "user_id"});
  user_role_relation.belongsTo(role, { foreignKey: "role_id"});
  role.hasMany(user_role_relation, { foreignKey: "role_id"});
  user_subpost.belongsTo(lost_post, { foreignKey: "post_id"});
  lost_post.hasMany(user_subpost, { foreignKey: "post_id"});
  user_subpost.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(user_subpost, { foreignKey: "user_id"});
  user_subscr_class.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(user_subscr_class, { foreignKey: "user_id"});

  return {
    credit_detail,
    ddd,
    lost_article,
    lost_post,
    notify,
    notify_user_relation,
    private_chat_detail,
    private_chat_relation,
    prize,
    prize_order,
    role,
    user,
    user_credit,
    user_lost_collect,
    user_lost_history,
    user_role_relation,
    user_subpost,
    user_subscr_class,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
