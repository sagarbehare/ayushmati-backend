const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'my_secret_key';

app.use(express.json());

function generateToken(username) {
  const token = jwt.sign({username}, 'my-secret-key', {
    expiresIn: '1h'
  });
  return token;
}

app.post('/login', async (req, res) => {
    // verify user credentials
    console.log('login called...');
    const { username, password } = req.body;
    if(username != 'admin' || password != 'test') {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // generate JWT token
    const token = generateToken(username);
    console.log('login called...' + token);

    //return token;

    // send token in response
    res.json({ token });
});

app.post('/logout', (req, res) => {
    // clear token cookie
    res.clearCookie('token');
    res.end();
});

// verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'my-secret-key');
    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // handle token expiration error
      return null;
    } else {
      // handle other errors
      throw err;
    }
  }
}

// check if token has expired
function isTokenExpired(token) {
  const decoded = verifyToken(token);
  if (!decoded) {
    // token has expired
    return true;
  }

  // check expiration time
  const { exp } = decoded;
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > exp;
}

app.get('/protected', (req, res) => {
    const token = req.cookies.token;
    if (!token || isTokenExpired(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // continue with protected route logic
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
