import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_ACCESSS_SECRET || "yourSecretKey";

export function authenticate(req, res, next) {
  const token = req.cookies.AccessToken
  if(token == null) return res.status(401).json({
    error : 'Unauthorized Access'
  })

  try {
    // jwt.verify(token, process.env.JWT_ACCESSS_SECRET, (err, payload) => {
    // if(err) return res.status(403).send(err)
    // req.user = payload;
    const decoded = jwt.verify(token, process.env.JWT_ACCESSS_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).send("Session expired. Please login again.");
  }
}