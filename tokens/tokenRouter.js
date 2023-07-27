import  appPublicaciones from '../routers/publicaciones.js';
import appUsers from '../routers/users.js';
import  appAnimales from '../routers/animales.js';

export async function dynamicRouter(req, res, next) {
  const { tabla } = req.params;

  switch (tabla) {
    case 'users':
      return appUsers(req, res, next);
    case 'publicaciones':
      return appPublicaciones(req, res, next);
    case 'animales':
      return appAnimales(req, res, next);
    default:
      return res.status(404).send({ error: tabla+'Ruta no encontrada' });
  }
}