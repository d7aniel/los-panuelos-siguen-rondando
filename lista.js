export let lista = [
  // { lt: -34.6084608, lg: -58.3721794 }, //plaza de mayo
  // { lt: -34.914454, lg: -57.946792 }, //plaza san martin
  // { lt: -42.763019, lg: -65.034525 }, //playon de madrin
  // { lt: -38.04082056323792, lg: -57.54760432137781 }, //Av. Edison 301, B7603BKG Mar del Plata, Provincia de Buenos Aires
  // { lt: -26.830453, lg: -65.203803 }, //Tucuman
  // { lt: -54.807411, lg: -68.303749 }, //Ushuaia, plaza civica
  // { lt: -37.328723, lg: -59.136944 }, //Tandil, plaza independencia
  // { lt: -32.947081, lg: -60.633174 }, //Rosario, Plaza 25 de mayo
  // { lt: -41.13346, lg: -71.310158 }, // Bariloche . Centro Civico
  // { lt: -31.649302, lg: -60.709192 }, // Santa Fe, Plaza del soldado
  // { lt: -36.777042, lg: -59.862955 }, // Azul
  // { lt: -42.78600319251691, lg: -65.00757861584869 },
  //   { lt: -34.886436, lg: -58.005834 },
  // { lt: -34.8863938, lg: -58.005902 },
  //   { lt: -34.88716, lg: -58.006367 },
  { lt: -34.608460, lg: -58.372179 }, //Buenos Aires, CABA, Plaza de Mayo
  { lt: -34.915328, lg: -57.947900 }, //Buenos Aires, La Plata, Plaza San Martin
  { lt: -38.040820, lg: -57.547604 }, //Buenos Aires, Mar del Plata, Av. Edison 301
  { lt: -37.328723, lg: -59.136944 }, //Buenos Aires, Tandil, Plaza Independencia
  { lt: -36.777042, lg: -59.862955 }, //Buenos Aires, Azul, Playon de la Municipalidad
  { lt: -37.998552, lg: -57.548667 }, //Buenos Aires, Mar del Plata, Playon Catedral
  { lt: -34.593872, lg: -60.946715 }, //Buenos Aires, Junin, Homenaje Plaza 25 de Mayo
  { lt: -34.881829, lg: -60.002095 }, //Buenos Aires, Chivilcoy, Plaza de la Memoria
  { lt: -38.880460, lg: -62.075010 }, //Buenos Aires, Bahia Blanca, Plaza Belgrano
  { lt: -35.441030, lg: -58.803750 }, //Buenos Aires, San Miguel del Monte, Plaza Alsina
  { lt: -34.822580, lg: -58.390850 }, //Buenos Aires, Burzaco, Plaza de la Memoria y DDHH
  { lt: -34.641930, lg: -58.513470 }, //Buenos Aires, CABA, Liniers, Plazoleta de Isidora
  { lt: -34.562563, lg: -59.121270 }, //Buenos Aires, Lujan, Plaza Belgrano
  { lt: -34.605800, lg: -58.419170 }, //Buenos Aires, CABA, Almagro, Plaza Almagro
  { lt: -34.538333, lg: -58.465148 }, //Buenos Aires, CABA, Ex Esma, Monumento a la Memoria
  { lt: -34.590840, lg: -58.631800 }, //Buenos Aires, Hurlingham, Paseo de la Memoria
  { lt: -34.781800, lg: -58.259190 }, //Buenos Aires, Berazategui, Paseo de la Memoria
  { lt: -34.660500, lg: -58.666830 }, //Buenos Aires, Ituzaingo, Cuenta Nietxs
  { lt: -34.542930, lg: -58.712170 }, //Buenos Aires, San Miguel, Plaza de San Miguel
  { lt: -34.351530, lg: -58.798510 }, //Buenos Aires, Belen de Escobar, Espacio de la Memoria
  { lt: -35.111443, lg: -60.491178 }, //Buenos Aires, Bragado, Parque de la Memoria
  { lt: -24.212032, lg: -65.281284 }, //Jujuy, San Salvador de Jujuy, Parque de la Memoria
  { lt: -24.787280, lg: -65.412370 }, //Salta, Salta, Plaza Belgrano
  { lt: -25.134530, lg: -58.246430 }, //Formosa, Laguna Blanca, Paseo de la Memoria
  { lt: -26.830453, lg: -65.203803 }, //Tucuman, Sn. Miguel de Tucuman, Plaza Independencia
  { lt: -28.449580, lg: -65.734650 }, //Catamarca, Sn. Fdo. del V. de Cat., Pza. B. Pque. Chacabuco
  { lt: -29.438430, lg: -66.858940 }, //La Rioja, La Rioja, Plaza de la Memoria
  { lt: -31.528743, lg: -68.640094 }, //San Juan, Rivadavia, Sitio de Memoria La Marquesita
  { lt: -27.115920, lg: -58.969280 }, //Chaco, Margarita Belen, Parque de la Memoria
  { lt: -27.362698, lg: -55.901097 }, //Misiones, Posadas, Reforma Univ., Monumento M. V. y J.
  { lt: -28.635370, lg: -65.130440 }, //Santiago del Estero, Frias, Plazoleta de la Memoria
  { lt: -32.697200, lg: -62.112470 }, //Cordoba, Marcos Juarez, Plazoleta de la Memoria y la Paz
  { lt: -31.428210, lg: -62.097770 }, //Cordoba, San Francisco, Paseo de la Memoria
  { lt: -30.856680, lg: -64.521880 }, //Cordoba, Capilla del Monte, Pzoleta. por la M. V. y J.
  { lt: -32.947081, lg: -60.633174 }, //Santa Fe, Rosario, Plaza 25 de mayo
  { lt: -31.649302, lg: -60.709192 }, //Santa Fe, Santa Fe, Plaza del Soldado argentino
  { lt: -31.261260, lg: -61.475610 }, //Santa Fe, Rafaela, Plaza de la Memoria
  { lt: -30.740440, lg: -59.644390 }, //Entre Rios, La Paz, Plaza 25 de Mayo
  { lt: -27.468730, lg: -58.831580 }, //Corrientes, Corrientes, Plaza Cabral
  { lt: -27.473510, lg: -58.853849 }, //Corrientes, Corrientes, Espacioo para la Memoria
  { lt: -33.302350, lg: -66.336390 }, //San Luis, San Luis, Pza. Pringles, Monolito por la Memoria
  { lt: -36.621530, lg: -64.275180 }, //La Pampa, Santa Rosa, Pque. provincial de la Memoria
  { lt: -34.612890, lg: -68.326350 }, //Mendoza, San Rafael, Pza. Memoria Verdad y Justicia
  { lt: -41.133459, lg: -71.310158 }, //Rio Negro, Bariloche, Centro Civico
  { lt: -38.990840, lg: -64.095800 }, //Rio Negro, Rio Colorado, Plaza San Martin
  { lt: -38.828450, lg: -68.063910 }, //Rio Negro, Cinco Saltos, Plazoleta de la Memoria
  { lt: -39.425130, lg: -65.702030 }, //Rio Negro, Lamarque, Plaza Santa Genoveva
  { lt: -40.156870, lg: -71.352544 }, //Neuquen, San Martin de los Andes, Plaza San Martin
  { lt: -38.959480, lg: -68.095700 }, //Neuquen, Neuquen, Monumento Memoria Verdad y Justicia
  { lt: -38.955360, lg: -68.059240 }, //Neuquen, Neuquen, Monumeto a la Madre
  { lt: -42.763323, lg: -65.034768 }, //Chubut, Puerto Madryn, Playon
  { lt: -46.445660, lg: -67.516710 }, //Santa Cruz, Caleta Olivia, Boulevard de la Memoria
  { lt: -54.807385, lg: -68.303815 }, //Tierra del Fuego, Ushuaia, Plaza Civica 12 de Octubre
  { lt: -64.241230, lg: -56.623190 }, //Antartida Argentina, Base Marambio
  { lt: -51.796730, lg: -58.940660 }, //Islas Malvinas, Darwin, Cementerio
  { lt: -34.886869, lg: -58.006562 }, //Test GPS, LALFI, CIOp
];
