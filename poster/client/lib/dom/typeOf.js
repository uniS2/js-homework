function typeOf(data){
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

export const isString = (data) => typeOf(data) === "string";