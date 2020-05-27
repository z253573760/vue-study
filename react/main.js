class Updater {
  constructor(payload, nextUpdate) {
    this.payload = payload;
    this.nextUpdate = nextUpdate;
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null;
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueUpdate(update) {
    //
  }
}
