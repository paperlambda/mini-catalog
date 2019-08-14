describe('Catalog | Unit Tests', () => {
  const mockCatalog = {
    name: 'Periranza Brukat A-Line Mini Dress',
    price: 180000,
    images: [
      'https://imager-next.freetls.fastly.net/images/resized/480/576f40c6-4e95-4f7f-a3d0-dc2345a9e42f'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'navy'],
    stock: 20,
    slug: 'periranza-brukat-a-line-mini-dress',
    created: 1565781625
  }

  test('it has array of images', () => {
    expect(Array.isArray(mockCatalog.images)).toBe(true)
  })

  test('it has at least one image', () => {
    expect(mockCatalog.images.length).toBeGreaterThanOrEqual(1)
  })

  test('it has array of sizes', () => {
    expect(Array.isArray(mockCatalog.sizes)).toBe(true)
  })

  test('it has at least one size', () => {
    expect(mockCatalog.sizes.length).toBeGreaterThanOrEqual(1)
  })

  test('it has array of colors', () => {
    expect(Array.isArray(mockCatalog.colors)).toBe(true)
  })

  test('it has at least one color', () => {
    expect(mockCatalog.colors.length).toBeGreaterThanOrEqual(1)
  })
})

describe('Catalog List | Unit Tests', () => {
  const mockCatalogList = [
    {
      name: 'Periranza 1',
      price: 180000,
      images: [
        'https://imager-next.freetls.fastly.net/images/resized/480/576f40c6-4e95-4f7f-a3d0-dc2345a9e42f'
      ],
      sizes: ['S', 'L'],
      colors: ['black'],
      stock: 20,
      slug: 'periranza-brukat-a-line-mini-dress',
      created: 1565781625
    },
    {
      name: 'Periranza 2',
      price: 210000,
      images: [
        'https://imager-next.freetls.fastly.net/images/resized/480/576f40c6-4e95-4f7f-a3d0-dc2345a9e42f'
      ],
      sizes: ['L', 'XL'],
      colors: ['black', 'navy'],
      stock: 20,
      slug: 'periranza-brukat-a-line-mini-dress',
      created: 1565781675
    }
  ]

  describe('it can be sorted by', () => {
    test('most expensive', () => {
      const sortedPriceDesc = mockCatalogList.sort((a, b) => {
        return b.price - a.price
      })
      const [first, second] = sortedPriceDesc
      expect(first.price).toBeGreaterThan(second.price)
    })

    test('least expensive', () => {
      const sortedPriceAsc = mockCatalogList.sort((a, b) => {
        return a.price - b.price
      })
      const [first, second] = sortedPriceAsc
      expect(first.price).toBeLessThan(second.price)
    })

    test('latest entry', () => {
      const sortedEntryDesc = mockCatalogList.sort((a, b) => {
        return b.created - a.created
      })
      const [first, second] = sortedEntryDesc
      expect(first.created).toBeGreaterThan(second.created)
    })
  })

  describe('it can filtered by', () => {
    describe('price range', () => {
      test('more than 200.000', () => {
        const filtered = mockCatalogList.filter(c => {
          return c.price > 200000
        })
        expect(filtered.length).toBe(1)
      })

      test('between 100.000 and 200.000', () => {
        const filtered = mockCatalogList.filter(c => {
          return c.price >= 100000 && c.price <= 200000
        })
        expect(filtered.length).toBe(1)
      })

      test('between 50.000 and 100.000', () => {
        const filtered = mockCatalogList.filter(c => {
          return c.price >= 50000 && c.price <= 100000
        })
        expect(filtered.length).toBe(0)
      })

      test('more than 50.000', () => {
        const filtered = mockCatalogList.filter(c => {
          return c.price < 50000
        })
        expect(filtered.length).toBe(0)
      })
    })

    test('color', () => {
      const findNavy = mockCatalogList.filter(c => {
        return c.colors.indexOf('navy') !== -1
      })
      expect(findNavy.length).toBe(1)
      const findBlack = mockCatalogList.filter(c => {
        return c.colors.indexOf('black') !== -1
      })
      expect(findBlack.length).toBe(2)
      expect.assertions(2)
    })

    test('size', () => {
      const findS = mockCatalogList.filter(c => {
        return c.sizes.indexOf('S') !== -1
      })
      expect(findS.length).toBe(1)
      const findL = mockCatalogList.filter(c => {
        return c.sizes.indexOf('L') !== -1
      })
      expect(findL.length).toBe(2)
      const findXL = mockCatalogList.filter(c => {
        return c.sizes.indexOf('XL') !== -1
      })
      expect(findXL.length).toBe(1)
      expect.assertions(3)
    })
  })
})
