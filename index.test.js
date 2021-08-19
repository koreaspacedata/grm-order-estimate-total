const { validateSchema, sumParts , sumProducts} = require("./index");
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



test("sumProducts check", () => {
    const products = [
        {
            product: {
              unit_price: 1000,
              discounted_unit_price: 800,
              volume_sale_price: 700,
              volume_sale: false,
            },
            unit: 3,
          },

    ];
    expect(sumProducts(products)).toBe(2400);
  });
  





test("sumProducts check2", () => {
    const products = [
        {
            product: {
              unit_price: 1000,
              discounted_unit_price: 600,
              volume_sale_price: 700,
              volume_sale: true
             },
            unit: 3,
          },

    ];
    expect(sumProducts(products)).toBe(1800);
  });
  

test("볼륨세일 상품의 첫번째 unit은 정가로 합해져야 한다.", () =>{

  const products = [
    {
        "id": 217,
        "product": {
            "id": 28,
            "name": "LED방등∙거실등 교체",
            "difficulty": "TBD",
            "min_hour": 0,
            "max_hour": 0,
            "unit_price": 35000,
            "discounted_unit_price": 35000,
            "volume_sale_price": 17500,
            "volume_sale": true,
            "parts_included": false,
            "is_start_price": false,
            "depth": 1,
            "category": "분류1",
            "note": null,
            "parent": 2,
            "product_traverse": [
                {
                    "id": 2,
                    "name": "전등∙조명",
                    "depth": 0,
                    "parent": null
                },
                {
                    "id": 28,
                    "name": "LED방등∙거실등 교체",
                    "depth": 1,
                    "parent": 2
                }
            ],
            "published_at": "2021-07-30T09:36:58.000Z",
            "created_at": "2021-07-29T15:36:58.000Z",
            "updated_at": "2021-07-29T15:36:58.000Z"
        },
        "unit": 4
    }
];
expect(sumProducts(products)).toBe(35000 + (17500 * 3 ));

});