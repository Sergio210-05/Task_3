
class Good {
    static id = 0;
    constructor(name, description, sizes, price, available, goodId=null) {
        this.id = (goodId===null)?++this.constructor.id:goodId;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        if (available == true) {
            this.available = true;
        } else {
            this.available = false;
        }
    }
}

class GoodsList {
    constructor(goods, filter_, sortPrice, sortDir) {
        this.goods = goods;
        this.filter = filter_;
        this.sortPrice = (sortPrice==true)?true:false;
        this.sortDir = (sortDir==true)?true:false;
    }

    get list() {
        const regexp = this.filter;
        const filtered = this.goods.filter((good) => regexp.test(good.name));
        if (this.sortPrice === true) {
            const reverse = (this.sortDir==true)?1:-1;
            filtered.sort((good1, good2) => (good1.price > good2.price) ? reverse : reverse*(-1));
        }
        return filtered;
    }

    add(good) {
        this.goods.push(good)
    }

    remove(id) {
        const goodDel = this.goods.filter(good => good.id === id)[0];
        const index = this.goods.indexOf(goodDel)
        this.goods.splice(index, 1);
    }
}

class BasketGood extends Good {
    constructor(someGood, amount=1) {
        super(someGood.name, someGood.description, someGood.sizes, someGood.price, someGood.available, someGood.id);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    get totalSum() {
        const totalCost = this.goods.reduce((total, basketGood) => basketGood.price * basketGood.amount + total, 0);
        return totalCost;
    }

    get totalAmount() {
        return this.goods.length;
    }

    add (good, amount=1) {
        for (let position in this.goods) {
            if (this.goods[position].id === good.id) {
                this.goods[position].amount += amount;
                return;
            }
        }
        const newPosition = new BasketGood(good, amount);
        this.goods.push(newPosition);
        return;
    }

    remove(good, amount) {
        for (let position in this.goods) {
            if (this.goods[position].id === good.id) {
                this.goods[position].amount -= amount;
                if (this.goods[position].amount <= 0) {
                    this.goods.splice(position, 1);
                }
                return;
            }
        }
    }

    clear() {
        this.goods.length = 0;
    }

    removeUnavailable() {
        const filteredList = this.goods.filter((good) => good.available === true);
        this.goods = filteredList;
    }
}


const tomato = new Good('tomato', 'rose_tomato', [10, 14, 20], 150, true)
const cucumber = new Good('cucumber', 'fresh', [10, 12, 14], 200, true)
const beef = new Good('beef', '100 days feeded', [1, 2, 3], 300, true)
const potato = new Good('potato', 'young', [8, 9, 10], 80, false)
const milk = new Good('milk', 'cow milk', [0.5, 1.0], 100, true)
const decaffeinato = new Good('coffee decaffeinato', 'arabica', [0.250, 0.400], 125, true)

const catalogue = new GoodsList([tomato, cucumber, beef, potato], /.+to/gm, true, true)
// console.log(catalogue.list)

catalogue.add(decaffeinato)
catalogue.remove(4)
// console.log(catalogue.list)

const myBasket = new Basket()
myBasket.add(tomato, 10)
myBasket.add(potato, 2)
myBasket.add(milk, 5)
myBasket.add(beef)
myBasket.add(beef)
myBasket.remove(milk, 6)
myBasket.removeUnavailable()
myBasket.add(milk, 1)
myBasket.add(milk, 2)
myBasket.remove(milk, 1)
console.log(myBasket)

console.log(myBasket.totalAmount)
console.log(myBasket.totalSum)
myBasket.clear()

// console.log(myBasket)
