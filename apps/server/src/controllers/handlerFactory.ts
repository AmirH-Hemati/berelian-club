import type { Model } from "mongoose";
import CatchError from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

export const createOne = <T>(Model: Model<T>) =>
  CatchError(async (req, res, next) => {
    console.log(req.body);
    const document = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: document,
    });
  });

export const getOne = <T>(Model: Model<T>) =>
  CatchError(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      throw new AppError("داکیومنتی با آیدی مشخص شده پیدا نشد", 404);
    }
    res.status(200).json({
      status: "success",
      data: document,
    });
  });

export const getAll = <T>(Model: Model<T>) =>
  CatchError(async (req, res, next) => {
    // throw new Error("this is error");

    const features = new ApiFeatures<T>(Model.find(), req.query)
      .filter()
      .search()
      .sort()
      .fields();
    const { total, limit, page, totalPages } = await features.pagination();
    const documents = await features.query;

    res.status(200).json({
      status: "success",
      data: documents,
      pagination: {
        totalPages,
        total,
        limit,
        page,
      },
    });
  });

export const updateOne = <T>(Model: Model<T>) =>
  CatchError(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      throw new AppError("داکیومنتی با آیدی مشخص شده پیدا نشد", 404);
    }
    res.status(200).json({
      status: "success",
      data: document,
    });
  });

export const deleteOne = <T>(Model: Model<T>) =>
  CatchError(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      throw new AppError("داکیومنتی با آیدی مشخص شده پیدا نشد", 404);
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
