import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const {action} = req.query;

  if (action === 'sign-up') {
    const {username, email, password} = req.query;

    let doc = await req.db.collection('users').findOne({
      $or: [{username}, {email}]
    })

    if (!doc) {
      await req.db.collection('users').insert({
        username,
        email,
        password
      });

      return res.json({success: true});
    }

    res.json({success: false});
  }
  else if (action === 'sign-in') {
    const {email, password} = req.query;

    const getSessionToken = (length = 30) => {
      const charPool = '!@$^*_-():.0123456789abcdefghijklmnopqrstuvwxyz';
      let token = '';

      const getRandomArbitrary = (min, max) => parseInt(Math.random() * (max - min) + min);

      while (length--) {
        const charIndex = getRandomArbitrary(0, charPool.length);
        const char = charPool[charIndex];

        if (getRandomArbitrary(1, 3) % 2) char.toUpperCase();

        token += char;
      }

      return token;
    };

    let doc = await req.db.collection('users').findOne({
      email,
      password
    });

    if (doc) {
      const token = getSessionToken();
      await req.db.collection('users').updateOne(
          { email },
          { $set: { token } }
      )

      return res.json({ ...doc, token });
    }

    res.json({success: false});
  }
  else if (action === 'profile-get-access') {
    const {token, username} = req.query;

    let doc = await req.db.collection('users').findOne({
      username,
      token
    });

    res.json({haveAccess: !!doc});
  }
});

export default handler;
