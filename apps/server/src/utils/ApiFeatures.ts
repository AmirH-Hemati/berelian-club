import type { Query } from "mongoose";
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

    Object.entries(queryObj).forEach(([key, value]) => {
      if (typeof value === "string" && value.includes(",")) {
        queryObj[key] = {
          $in: value.split(",").map((item) => item.trim()),
        };
      }
    });

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  search() {
    if (!this.queryString.search) return this;

    const searchTerm = this.queryString.search;
    const searchFields = this.queryString.searchFields?.split(",") || [];

    const directFields = [
      "fileName",
      "originalName",
      "firstName",
      "lastName",
      "nationalCode",
      "phoneNumber",
      "email",
    ];
    const safeFields = searchFields.filter((field: string) =>
      directFields.includes(field),
    );

    if (safeFields.length > 0) {
      const conditions = safeFields.map((field: string) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      }));

      this.query = this.query.find({ $or: conditions });
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
