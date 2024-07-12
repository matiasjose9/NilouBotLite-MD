import fetch from 'node-fetch';

let handler = async (m, { args }) => {
    if (!args[0]) {
        return m.reply(`Ingresa un nombre de usuario de GitHub.`);
    }

    let query = args.join(' ');
    let apiUrl = `http://192.101.68.21:2070/github/users?q=${encodeURIComponent(query)}`;

    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al buscar el usuario: ${response.statusText}`);
        }

        let users = await response.json();
        if (users.length === 0) {
            return m.reply(`No se encontraron usuarios con el nombre: ${query}`);
        }

        let user = users[0];
        let txt = `*Información del Usuario de GitHub*\n\n`;
        txt += `❥︎ *Nombre de Usuario*: ${user.login}\n`;
        txt += `❥︎ *ID*: ${user.id}\n`;
        txt += `❥︎ *URL del Perfil*: ${user.url}\n`;
        txt += `❥︎ *URL de Repositorios*: ${user.public_repos}\n`;
        txt += `❥︎ *URL de Seguidores*: ${user.followers}\n`;

        await m.reply(txt);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        await m.reply(`Hubo un error al buscar el usuario de GitHub: ${error.message}`);
    }
};

handler.help = ['githubuser <texto>'];
handler.tags = ['info'];
handler.command = /^(githubuser)$/i;
handler.register = true;

export default handler;