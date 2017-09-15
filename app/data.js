
import _ from 'lodash';

export function defaultData() {
    const items = [
        { name: 'Fresno', price: 199 },
        { name: 'Toledo', price: 299 },
    ];

    _.assign(items[0], {
        destinations: [items[1], null],
    });

    _.assign(items[1], {
        destinations: [items[0], null],
    });

    return items;
}

export function testData() {
    const items = [
        { name: 'A', price: 100 }, // 0
        { name: 'B', price: 900 }, // 1
        { name: 'C', price: 200 }, // 2
        { name: 'D', price: 300 }, // 3
        { name: 'E', price: 100 }, // 4
    ];

    _.assign(items[0], {
        destinations: [items[1], items[2]],
    });

    _.assign(items[1], {
        destinations: [items[3], items[4]],
    });

    _.assign(items[2], {
        destinations: [items[0], items[3]],
    });

    _.assign(items[3], {
        destinations: [items[0], items[4]],
    });

    _.assign(items[4], {
        destinations: [null, null],
    });

    return items;
}
