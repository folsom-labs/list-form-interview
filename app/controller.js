
import $ from 'jquery';

import { defaultData, testData } from './data';
import { ListState } from './state';

function itemText(item) {
    return (
        item.name
        + ' ($' + item.price + ')'
        + ' -> '
        + (item.destinations[0] ? item.destinations[0].name : 'N/A')
        + ' or '
        + (item.destinations[1] ? item.destinations[1].name : 'N/A'));
}

export class FormController {
    constructor() {
        this.state = new ListState();
        this.json = '';
    }

    initialize() {
        $('#divEditBox').hide();

        $('#btnAdd').on('click', () => {
            this.openEditBox(
                'NEW LOCATION', 100, null, null,
                (name, price, index1, index2) => {
                    const destination1 = (index1 > 0) ? this.state.items[index1 - 1] : null;
                    const destination2 = (index2 > 0) ? this.state.items[index2 - 1] : null;
                    this.state.addItem(name, price, destination1, destination2);
                    this.updateList();
                });
        });

        $('#btnEdit').on('click', () => {
            const item = this.selectedItem();
            if (item) {
                this.openEditBox(
                    item.name, item.price, item.destinations[0], item.destinations[1],
                    (name, price, index1, index2) => {
                        const destination1 = (index1 > 0) ? this.state.items[index1 - 1] : null;
                        const destination2 = (index2 > 0) ? this.state.items[index2 - 1] : null;
                        this.state.editItem(item, name, price, destination1, destination2);
                        this.updateList();
                    });
            }
        });

        $('#btnClone').on('click', () => {
            const item = this.selectedItem();
            if (item) {
                this.state.cloneItem(item);
                this.updateList();
            }
        });

        $('#btnDelete').on('click', () => {
            const item = this.selectedItem();
            if (item) {
                this.state.deleteItem(item);
                this.updateList();
            }
        });

        $('#btnUndo').on('click', () => {
            this.state.undoChange();
            this.updateList();
        });

        $('#btnRedo').on('click', () => {
            this.state.redoChange();
            this.updateList();
        });

        $('#btnSerialize').on('click', () => {
            this.json = this.state.serialize();
            this.updateJSON();
        });

        $('#btnDeserialize').on('click', () => {
            this.state.deserialize(this.json);
            this.updateList();
        });

        //

        $('#btnAdvTestData').on('click', () => {
            this.state.setData(testData());
            this.updateList();
        });

        $('#btnAdvAllDestinations').on('click', () => {
            const itemA = this.selectedAdvA();
            if (itemA) {
                const locs = this.state.allDestinations(itemA);
                if (locs) {
                    let text = '';
                    for (const item of locs) text += item.name + ', ';
                    this.updateAdvOutput(text);
                } else {
                    this.updateAdvOutput('N/A');
                }
            }
        });

        $('#btnAdvAllOrigins').on('click', () => {
            const itemA = this.selectedAdvA();
            if (itemA) {
                const locs = this.state.allOrigins(itemA);
                if (locs) {
                    let text = '';
                    for (const item of locs) text += item.name + ', ';
                    this.updateAdvOutput(text);
                } else {
                    this.updateAdvOutput('N/A');
                }
            }
        });

        $('#btnAdvExists').on('click', () => {
            const itemA = this.selectedAdvA();
            const itemB = this.selectedAdvB();
            if (itemA && itemB) {
                const valid = this.state.validPath(itemA, itemB);
                this.updateAdvOutput(valid ? 'Yes' : 'No');
            }
        });

        $('#btnAdvCheapest').on('click', () => {
            const itemA = this.selectedAdvA();
            const itemB = this.selectedAdvB();
            if (itemA && itemB) {
                const path = this.state.cheapestPath(itemA, itemB);
                if (path) {
                    let text = '';
                    for (const item of path) text += item.name + ', ';
                    this.updateAdvOutput(text);
                } else {
                    this.updateAdvOutput('N/A');
                }
            }
        });

        this.state.setData(defaultData());
        this.updateList();
    }

    selectedItem() {
        const list = $('#listMaster');
        if (list[0].selectedIndex >= 0) {
            return this.state.items[list[0].selectedIndex];
        }

        return null;
    }

    selectedAdvA() {
        const list = $('#listAdvA');
        if (list[0].selectedIndex >= 0) {
            return this.state.items[list[0].selectedIndex];
        }

        return null;
    }

    selectedAdvB() {
        const list = $('#listAdvB');
        if (list[0].selectedIndex >= 0) {
            return this.state.items[list[0].selectedIndex];
        }

        return null;
    }

    populateDestinationList(list, destination) {
        list.empty();

        list.append($("<option/>", {
            selected: !destination,
            value: -1,
            text: ''
        }));

        let i = 0;
        for (const item of this.state.items) {
            list.append($("<option/>", {
                selected: (destination === item),
                value: i,
                text: item.name,
            }));
            ++i;
        }
    }

    openEditBox(name, price, destination1, destination2, callback) {
        $('#divEditBox').show();

        $('#txtName').val(name);
        $('#txtPrice').val(price);

        this.populateDestinationList($('#listDestination1'), destination1);
        this.populateDestinationList($('#listDestination2'), destination2);

        $('#btnOk').on('click', () => {
            if (callback) {
                callback(
                    $('#txtName').val(),
                    $('#txtPrice').val(),
                    $('#listDestination1')[0].selectedIndex,
                    $('#listDestination2')[0].selectedIndex);
            }

            $('#divEditBox').hide();
            $('#btnOk').off('click');
        });
    }

    updateList() {
        const list = $('#listMaster');
        list.empty();
        let i = 0;
        for (const item of this.state.items) {
            list.append($("<option/>", {
                value: i,
                text: itemText(item),
            }));
            ++i;
        }

        this.updateAdvSubLists();
    }

    updateAdvSubLists() {
        const listA = $('#listAdvA');
        listA.empty();

        const listB = $('#listAdvB');
        listB.empty();

        let i = 0;
        for (const item of this.state.items) {
            listA.append($("<option/>", {
                value: i,
                text: item.name,
            }));

            listB.append($("<option/>", {
                value: i,
                text: item.name,
            }));

            ++i;
        }
    }

    updateJSON() {
        $('#divJsonText').html(this.json);
    }

    updateAdvOutput(text) {
        $('#divAdvOutput').html(text);
    }
}
