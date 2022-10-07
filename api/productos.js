import axios from "axios";
import qs from "qs";
import { BASE_PATH } from "../utils/constants";

const mostrarProductos = async (limit) => {
  try {
    const limitItems = `_limit=${limit}`;
    const populate = "populate=*";
    const sortItem = `_sort=createdAt:desc`;
    const url = `${BASE_PATH}/api/productos?${populate}&${limitItems}&${sortItem}`;
    const resolve = await fetch(url).then((respuesta) => {
      return respuesta.json();
    });
    return resolve;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const obtenerLaPlataformaLectura = async (modolectura, limit, start) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          modolectura: {
            url: {
              $contains: modolectura,
            },
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
        sort: ["createdAt:asc"],
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/productos?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const obtenertotaldejuegos = async (modolectura) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          modolectura: {
            url: {
              $contains: modolectura,
            },
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/productos?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getGameByUrlAppi = async (path) => {
  try {
    const filters = qs.stringify(
      {
        filters: {
            url: {
              $contains: path,
            },
          
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${BASE_PATH}/api/productos?${filters}`;

    const resolve = await axios(url)
    const result = await resolve.data
    return result.data[0]

  } catch (error) {
    console.log(error);
    return null;
  }
};


const searchProducto = async (title) => {

  try {
    const url = `${BASE_PATH}/api/productos?populate=*&_q=${title}`
    const resolve = await fetch(url).then(respuesta=>{
      return respuesta.json()
    })

    return resolve
  
  } catch (error) {
    console.log(error)
    return null
  }
}

export { mostrarProductos,
   obtenerLaPlataformaLectura, 
   obtenertotaldejuegos,
   getGameByUrlAppi,
   searchProducto
  };
