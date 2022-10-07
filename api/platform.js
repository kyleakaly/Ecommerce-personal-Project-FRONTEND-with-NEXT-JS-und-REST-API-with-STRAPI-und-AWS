import { BASE_PATH } from "../utils/constants";

const obtenerlosdatosdelmenu = async () => {
  try {
    const url = `${BASE_PATH}/api/modolecturas?_sort=position:asc`;

    const resolve = await fetch(url).then((respuesta) => {
      return respuesta.json();
    });

    return resolve;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { obtenerlosdatosdelmenu };
