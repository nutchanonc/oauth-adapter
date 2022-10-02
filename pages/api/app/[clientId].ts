import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError, handleErrResponse } from "../../../api/error";
import { AuthMiddleware } from "../../../api/middlewares/auth.middleware";
import { createResponse } from "../../../api/types/response";
import { applicationUsecase } from "../../../api/usecases";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { success, payload, error } = AuthMiddleware(req, res);
    if (!success) {
      return;
    }

    const { clientId } = req.query;
    if (!clientId) {
      return res
        .status(400)
        .send(createResponse(false, "Require clientId.", null));
    }

    if (req.method === "GET") {
      const app = await applicationUsecase.findOneApp({
        clientId: clientId as string,
      });
      if (app === null) {
        return res.status(200).send(createResponse(true, "", app));
      }
      if (app.ownerId !== payload.uid) {
        return res
          .status(405)
          .send(createResponse(false, "Not the application owner.", null));
      }
      return res.status(200).send(createResponse(true, "", app));
    }

    if (req.method === "PUT") {
      const { appDescription, creatorName, callbackUrl, devCallbackUrl } =
        req.body;
      const { success, status, application } =
        await applicationUsecase.updateApp(payload.uid, clientId as string, {
          appDescription,
          creatorName,
          callbackUrl,
          devCallbackUrl,
        });
      if (!success) {
        return handleErrResponse(res, status, "", null);
      }
      return res
        .status(200)
        .send(createResponse(true, "Update complete", application));
    }

    if (req.method === "DELETE") {
      const { success, status } = await applicationUsecase.deleteApp(
        payload.uid,
        clientId as string
      );
      if (!success) {
        return handleErrResponse(res, status, "", null);
      }
      return res
        .status(200)
        .send(createResponse(true, "Delete complete", null));
    }
  } catch (error) {
    handleApiError(res, error);
  }
};
export default handler;
