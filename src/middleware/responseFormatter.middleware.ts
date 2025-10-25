import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

interface IResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data?: any;
  error?: any;
  meta?: any;
}

export function responseFormatter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json.bind(res);

  res.json = (data: any): Response => {
    const statusCode = res.statusCode ? res.statusCode : StatusCodes.OK;

    const response: IResponse = {
      status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
      statusCode: statusCode,
      message: getReasonPhrase(statusCode),
    };
    if (statusCode >= 200 && statusCode < 300) {
      response.data = data.meta ? data.data : data;
    }

    if (statusCode >= 300) {
      response.error = data;
    }

    if (data.meta) {
      response.meta = data.meta;
    }

    return originalJson(response);
  };

  next();
}
