import type { Request, Response } from "express";
import CatchError from "../../utils/catchAsync.js";
import { permissionService } from "../../container/index.js";

export const getAllPermission = CatchError(
  async (req: Request, res: Response) => {
    const permissions = await permissionService.getAll();

    res.status(200).json({
      status: "success",
      data: permissions,
    });
  },
);

export const getOnePermission = CatchError(
  async (req: Request, res: Response) => {
    const permission = await permissionService.getById(req.params.id as string);

    res.status(200).json({
      status: "success",
      data: {
        permission,
      },
    });
  },
);

export const createPermission = CatchError(
  async (req: Request, res: Response) => {
    const permission = await permissionService.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        permission,
      },
    });
  },
);

export const updatePermission = CatchError(
  async (req: Request, res: Response) => {
    const permission = await permissionService.update(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      data: {
        permission,
      },
    });
  },
);

export const deletePermissionn = CatchError(
  async (req: Request, res: Response) => {
    const permission = await permissionService.delete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Permission غیرفعال شد",
      data: {
        permission,
      },
    });
  },
);
