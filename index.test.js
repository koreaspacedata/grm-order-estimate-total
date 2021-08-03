const { validateSchema, sumParts } = require("./index");
const { productsSchema, partsSchema, optionsSchema } = require("./schemas");

test("productsSchema check", () => {
  const products = [
    {
      product: {
        unit_price: 1000,
        discounted_unit_price: 900,
        volume_sale_price: 700,
        volume_sale: true,
      },
      unit: 3,
    },
  ];
  validateSchema(productsSchema, products);
});

test("partsSchema check", () => {
  const parts = [
    {
      unit: 3,
      price: 8000,
    },
  ];
  validateSchema(partsSchema, parts);
});

test("optionsSchema check", () => {
  const options = [
    {
      price: 1000,
    },
    {
      price: 3000,
    },
  ];
  expect(validateSchema(optionsSchema, options)).toBe(true);
});

test("sumParts check", () => {
  const parts = [
    {
      unit: 3,
      price: 8000,
    },
    {
      unit: 1,
      price: 7000,
    },
  ];
  expect(sumParts(parts)).toBe(31000);
});