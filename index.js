const Ajv = require('ajv');

const { productsSchema, partsSchema, optionsSchema } = require('./schemas');

function validateSchema(schema, data) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  if (!validate(data)) throw validate.errors;
  return true;
}

function sumProducts(products) {
  try {
    validateSchema(productsSchema, products);

    const sum = products.reduce((sum, p) => {
      const { product, unit } = p;
      let rowSum = 0;
      if(product.discounted_unit_price <= product.unit_price){
        rowSum = product.discounted_unit_price * unit;
      }else if(product.volume_sale && (unit > 1)){
        rowSum = (product.volume_sale_price * (unit - 1) ) + product.unit_price;
      }else{
        rowSum = unit_price * unit ;
      }
      // const price = product.discounted_unit_price <= product.unit_price ? 
      //               product.discounted_unit_price : product.unit_price;
      // const rowSum = product.volume_sale && (unit > 1) ?
      //                 (product.volume_sale_price * (unit - 1) ) + product.unit_price 
      //                 : price * unit ;
      return sum + rowSum;
    }, 0);

    return sum;
  } catch (e){
    throw new Error(`${JSON.stringify(e)}`)
  }
}

function sumParts(parts) {
  try {
    validateSchema(partsSchema, parts);
    const sum = parts.reduce((sum, p) => {
      const { price, unit } = p;
      return sum + price * unit;
    }, 0);

    return sum;
  } catch (e) {
    throw new Error(`${JSON.stringify(e)}`)
  }
}

function sumOptions(options) {
  try {
    validateSchema(optionsSchema, options);
    const sum = options.reduce((sum, o) => sum + o.price, 0);
    return sum;
  } catch (e) {
    throw new Error(`${JSON.stringify(e)}`)
  }
}

function estimateTotal(order) {

  

  const { products, parts, options } = order;
  const productsTotal= sumProducts(products);
  const partsTotal = sumParts(parts);
  const optionsTotal= sumOptions(options);
  const estimatedTotal = productsTotal + partsTotal + optionsTotal;

  return !isNaN(estimatedTotal) ? estimatedTotal : 0;
};

module.exports = { estimateTotal, validateSchema, sumProducts, sumParts, sumOptions };
