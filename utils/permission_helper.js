export const actions = ["view", "create", "update", "delete"];
export const special_permissions = {
  "Super-Admin": "have all permission",
};
export const module_permissions = {
  user_config: [
    "user_config_role",
    {
      'name': "user_config_user",
      'alias': 'user',
      'actions': ["view", "create", "update", "delete", 'restore'],
    }
  ],
};
export function get_all_permission() {
  let module_permission = {};
  Object.keys(this.module_permissions).forEach((module_name) => {
    module_permission[module_name] = [];
    this.module_permissions[module_name].forEach((permission_name) => {
      if (typeof permission_name === "string") {
        this.actions.forEach((action) => {
          module_permission[module_name].push({ value: `${action} ${permission_name}` });
        });
      } else {
        let actions;
        if (permission_name.actions)
          actions = permission_name.actions;
        else
          actions = this.actions;
        actions.forEach((action) => {
          const value = `${action} ${permission_name.name}`;
          module_permission[module_name].push(permission_name.alias ? {
            'display': `${action} ${permission_name.alias}`,
            value
          } : value);
        });
      }
    });
  });

  return module_permission;
}
