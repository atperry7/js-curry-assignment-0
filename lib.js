'use strict'

const entries =
  obj =>
    Object.keys(obj)
      .map(key => [key, obj[key]])

const listing =
  (name, price) => ({
    name,
    price
  })

const customer =
  (name, shoppingList) => ({
    name,
    shoppingList
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

/**
 * should return an array with the `itemName` repeated `count` number of times
 */
const itemRepeater =
    itemName =>
       count => Array.from({length: count}, (v, i) => itemName)

const listingsFilter =
  listings =>
    itemName =>
          listings.filter((list) => list.name === itemName)

// concat :: [a] -> [a] -> [a]
const concat = x => y => x.concat(y)

// concatMap :: (a -> [b]) -> [a] -> [b]
const concatMap = f => xs => xs.map(f).reduce((x, y) => concat(x)(y), [])

// id :: a -> a
const id = x => x

// flatten :: [[a]] -> [a]
const flatten = concatMap(id)

const shoppingListRepeater =
  func =>
    shoppingList => func(shoppingList).map((item) => itemRepeater(item[0])(item[1]))

/**
 * should return an array of carts with each given customer's shopping list
 * as an array of items
 */
const constructCarts =
  listings =>
    customers => {
      const arr = customers.map(cust => {
        return { customer: cust.name, items: flatten(shoppingListRepeater(entries)(cust.shoppingList)) }
      })

      return arr
      // const test = [(customers[0].shoppingList)] // Destructs the Customer Shopping List into an array
    }

module.exports = {
  listing,
  customer,
  constructCarts
}
