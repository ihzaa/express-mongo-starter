import { Role } from "../../models/role.js";
import {  Permission } from "../../models/permission.js";
import { RoleHasPermission } from "../../models/rolehaspermission.js";
import { validationResult } from "express-validator";

export async function index(req, res) {
  res.json(res.paginatedResult);
}
export async function store(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }
  const { name } = req.body;

  let createdData = await Role.create({ name });

  res.status(201).json({
    message: "Data Successfully Created!",
    data: {
      id: createdData.id,
    },
  });
}
export async function show(req, res) {
  const id = req.params.id;

  res.json({
    message: "Data Found!",
    data: res.obj,
  });
}
export async function update(req, res) {
  const id = req.params.id;

  let { name } = req.body;
  await Role.update(
    { name },
    {
      where: {
        id,
      },
    }
  );

  res.json({
    message: "Data Successfully Updated!",
  });
}
export async function destroy(req, res) {
  await res.obj.destroy();
  res.json({
    message: "Data Successfully Deleted!",
  });
}
export async function getPermission(req, res) {
  let permissions = await res.obj.getPermissions({
    attributes: ["name"],
    joinTableAttributes: [],
  });
  res.json({ permissions });
}
export async function storePermission(req, res) {
  let id = req.params.id;
  RoleHasPermission.destroy({
    where: {
      RoleId: id,
    },
  });
  let permissions = [...new Set(req.body.permissions)];
  permissions.forEach(async (permission) => {
    let get_permission = await Permission.findOne({
      where: { name: permission },
    });
    if (get_permission === null) {
      let created_permission = await Permission.create({ name: permission });
      await RoleHasPermission.create({
        PermissionId: created_permission.id,
        RoleId: id,
      });
    } else {
      await RoleHasPermission.create({
        permissionId: get_permission.id,
        RoleId: id,
      });
    }
  });

  res.status(201).json({
    message: "Data Successfully Created!",
  });
}
