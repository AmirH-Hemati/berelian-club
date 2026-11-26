import type { Request, Response } from "express";

import CatchError from "../../utils/catchAsync.js";
import type { UserDocument } from "../../models/user.model.js";

export const createContract = CatchError(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;

    const contract = await contractService.createContract(req.body, user.role);

    res.status(201).json({
      status: "success",
      data: {
        contract,
      },
    });
  },
);

export const getAllContracts = CatchError(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;

    const contracts = await contractService.getAllContracts(user.role);

    res.status(200).json({
      status: "success",
      results: contracts.length,
      data: {
        contracts,
      },
    });
  },
);

export const getContract = CatchError(async (req: Request, res: Response) => {
  const user = req.user as UserDocument;

  const contract = await contractService.getContractById(
    req.params.id as string,
    user._id.toString(),
    user.role,
  );

  res.status(200).json({
    status: "success",
    data: {
      contract,
    },
  });
});

export const updateContract = CatchError(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;

    const contract = await contractService.updateContract(
      req.params.id as string,
      req.body,
      user.role,
    );

    res.status(200).json({
      status: "success",
      data: {
        contract,
      },
    });
  },
);

export const deleteContract = CatchError(
  async (req: Request, res: Response) => {
    const user = req.user as UserDocument;

    await contractService.deleteContract(req.params.id as string, user.role);

    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);
