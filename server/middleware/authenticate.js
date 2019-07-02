import auth from 'basic-auth';

// simple authentication based on single user/password
// TODO: add a users db to add different users
const authenticate = (req, res, next) => {
  const credentials = auth(req);
  if (credentials) {
    if (credentials.name === 'golfer' && credentials.pass === 'E(cvkewnafsdie') {
      req.authenticated = true;
      next();
    } else {
      req.authenticated = false;
      const err = new Error("Invalid credentials sent, unable to authenticate user");
      err.status = 401;
      next(err);
    }
  } else {
    req.authenticated = false;
    const err = new Error("No credentials sent, unable to authenticate user");
    err.status = 401;
    next(err);
  }
}

export default authenticate;