export class List {

        name: string;
        pos: number;
        cards: Array<any>;
        id: number;
        constructor() {}

    }



  export  class Container {
        constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
      }

export class Widget {
        constructor(public name: string) {}
      }
