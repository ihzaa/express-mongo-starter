import { get_all_permission } from "../../utils/permission_helper.js";

export async function index(req, res) {
  res.json(get_all_permission());
}
