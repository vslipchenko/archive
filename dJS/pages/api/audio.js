import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const {action, token, username} = req.query;

    if (action === 'save-audio') {
        const generateId = (length = 60) => {
            const charPool = '0123456789abcdefghijklmnopqrstuvwxyz';
            let id = '';

            const getRandomArbitrary = (min, max) => parseInt(Math.random() * (max - min) + min);

            while (length--) {
                const charIndex = getRandomArbitrary(0, charPool.length);
                const char = charPool[charIndex];

                if (getRandomArbitrary(1, 3) % 2) char.toUpperCase();

                id += char;
            }

            return id;
        };

        let doc = await req.db.collection('users').findOne({
            token,
            username
        })

        if (doc) {
            const {file} = req.query;
            const audioId = generateId();

            doc = await req.db.collection('audio').insertOne({
                audioId,
                username,
                file
            });

            return res.json({ audioId });
        }

        res.json({success: false});
    } else if (action === 'get-audio') {
        const { id } = req.query;

        const doc = await req.db.collection('audio').findOne({ audioId: id  });

        if (doc) {
            return res.json(doc);
        }

        res.json({success: false});
    }
});

export default handler;
