import type { Model, Query } from "mongoose";
import qs from "qs";
export class ApiFeatures<T> {
  constructor(
    public query: Query<T[], T>,
    public queryString: any,
  ) {}

  filter() {
    const queryObj = { ...qs.parse(this.queryString) };
    const excludedField = [
      "page",
      "sort",
      "limit",
      "fields",
      "search",
      "searchFields",
    ];
    excludedField.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  search() {
    if (this.queryString.search) {
      const searchTerm = this.queryString.search;
      const searchFields = this.queryString.searchFields?.split(",") || [];

      const directFields = ["originalName", "firstName", "lastName"];

      const safeDirectFields = searchFields.filter((field: string) =>
        directFields.includes(field),
      );

      if (safeDirectFields.length > 0) {
        const directConditions = safeDirectFields.map((field: string) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        }));
        this.query = this.query.find({ $or: directConditions });
      }

      // const populateFields = ["user.firstName", "user.lastName"];
      // const safePopulateFields = searchFields.filter((field: string) =>
      //   populateFields.includes(field),
      // );
      // if (safePopulateFields.length > 0) {
      //   const populateConditions = safePopulateFields.map((field: string) => ({
      //     [field.split(".")[1]]: { $regex: searchTerm, $options: "i" },
      //   }));

      //   this.query = this.query
      //     .populate("user")
      //     .find({ $or: populateConditions });
      // }
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  async pagination() {
    const total = await this.query.model.countDocuments(this.query.getFilter());
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const totalPages = Math.ceil(total / limit) || 0;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return { total, page, totalPages, limit };
  }
}
