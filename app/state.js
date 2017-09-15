
import _ from 'lodash';

////////////////////////////////////////////////////////////////
// MODIFY CODE STARTING HERE
////////////////////////////////////////////////////////////////

export class ListState {
    constructor() {
        this.items = [];
    }

    setData(items) {
        this.items = items;
    }

    // add new item to list
    addItem(name, price, destination1, destination2) {
        this.items.push({
            name, price,
            destinations: [destination1, destination2] });
    }

    // delete item from list
    deleteItem(item) {
    }

    // add a copy of item to list
    cloneItem(item) {
    }

    // change the given item's properties
    editItem(item, name, price, destination1, destination2) {
        const edited = _.find(this.items, i => i === item);
        _.assign(edited, {
            name, price,
            destinations: [destination1, destination2] });
    }

    // undo a change
    undoChange() {
    }

    // redo a change
    redoChange() {
    }

    // serialize list to json string
    serialize() {
        return JSON.stringify({ a: 'b', c: 'd', e: 123, f: [1, 2, 3], g: { h: 'i', j: 'k' } });
    }

    // deserialize json string to list
    deserialize(json) {
        const obj = JSON.parse(json);
    }

    // return list of all destinations reachable from A
    allDestinations(itemA) {
        return _.map(this.items, i => i);
    }

    // return list of all origins which can reach A
    allOrigins(itemA) {
        return _.map(this.items, i => i);
    }

    // return whether or not valid path exists from A to B
    validPath(itemA, itemB) {
        return false;
    }

    // return list of locations on cheapest path to get from A to B
    cheapestPath(itemA, itemB) {
        return _.map(this.items, i => i);
    }
}
