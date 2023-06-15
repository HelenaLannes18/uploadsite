import nc from 'next-connect';
import db from '../../../../../utils/db';
import Post from '../../../../../models/Post';

const handler = nc();

handler.get(async(req, res) => {
    await db.connect();
    const post = await post.findById({});
    await db.disconnect();
    res.send(post);
});

handler.put(async (req, res) => {
    await db.connect();
    const post = await Post.findById(req.body.id);
    if (post) {
        post.title = req.body.title;
        post.data = req.body.data;
        post.slug = req.body.slug;
        post.category = req.body.category;
        post.image = req.body.image;
        post.perfil = req.body.perfil;
        post.author = req.body.author;
        post.resumo = req.body.resumo;
        post.body = req.body.body;
        post.featuredImage = req.body.featuredImage;
        await post.save();
        await db.disconnect();
        res.send({ message: 'Post atualizado com sucesso!' });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'Post não encontrado' });
    }

});