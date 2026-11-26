import { PermissionModel } from "../../models/permission.model.js";
import { PERMISSIONS } from "./permission.constants.js";

export async function seedPermissions() {
  const operations = PERMISSIONS.map((permission) => ({
    updateOne: {
      filter: { key: permission.key },
      update: {
        $setOnInsert: {
          ...permission,
          isActive: true,
          isSystem: true,
        },
      },
      upsert: true,
    },
  }));

  if (!operations.length) return;

  await PermissionModel.bulkWrite(operations);

  console.log("Permissions seeded successfully");
}
