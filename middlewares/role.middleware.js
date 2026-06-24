// import { errorResponse } from "../utils/response.js";

// export const requiredRole = (...allocatedRole) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return errorResponse(res, 400, "User is not authenticated");
//     }

//     if (!allocatedRole.includes("ADMIN")) {
//       return errorResponse(res, 400, "User is not authorized");
//     }

//     next();
//   };
// };
