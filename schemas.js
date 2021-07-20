module.exports = {
  productsSchema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        product: {
          type: 'object',
          properties: {
            unit_price: {
              type: 'integer',
              minimum: 0
            },
            discounted_unit_price: {
              type: 'integer',
              minimum: 0
            },
            volume_sale_price: {
              type: 'integer',
              minimum: 0
            },
            volume_sale: {
              type: 'boolean'
            }
          },
          required: [
            'unit_price',
            'discounted_unit_price',
            'volume_sale_price',
            'volume_sale'
          ]
        },
        unit: {
          type: 'integer',
          minimum: 1
        }
      },
      required: ['product', 'unit']
    },
    minItems: 1
  },

  partsSchema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        part: {
          type: 'object',
          properties: {
            unit_price: {
              type: 'integer',
              minimum: 0
            },
            discounted_unit_priced: {
              type: 'integer',
              minimum: 0
            },
          },
          required: [
            'unit_price',
            'discounted_unit_price'
          ]
        },
        unit: {
          type: 'integer',
          minimum: 1
        }
      },
      required: ['part', 'unit']
    },
  },

  optionsSchema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        price: {
          type: 'integer',
          minimum: 0,
        }
      },
      required: ['price']
    }
  }
};
