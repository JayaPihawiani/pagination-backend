import User from "../models/User.js";
import { Op } from "sequelize";

export const getUser = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search || "";
  const offset = limit * page;
  try {
    const count = await User.count({
      where: {
        [Op.or]: [
          { id: { [Op.like]: `%${search}%` } },
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    const totalPage = Math.ceil(count / limit);
    const result = await User.findAll({
      where: {
        [Op.or]: [
          { id: { [Op.like]: `%${search}%` } },
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    res.status(200).json({ page, limit, totalPage, count, result });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
