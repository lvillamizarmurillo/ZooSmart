import { generateToken } from './autorizacion.js';

export async function autenticacion(req, res) {
  const {endpoint} = req.params;

  try {
    const jwt = await generateToken(endpoint);
    res.send({ jwt });
  } catch (error) {
    res.status(500).send(error);
  }
}