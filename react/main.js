class Updater {
  constructor(payload, nextUpdate) {
    this.payload = payload;
    this.nextUpdate = nextUpdate;
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null; //原状态
    this.firstUpdate = null; // 第一个更新
    this.lastUpdate = null; // 最后一个更新
  }
  enqueueUpdate(update) {
    //
  }
}
