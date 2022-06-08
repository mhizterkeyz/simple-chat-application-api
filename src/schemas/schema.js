class Schema {
  constructor(params = {}) {
    const { id, createdAt = new Date() } = params;
    this.id = id;
    this.createdAt = createdAt;
  }
}

module.exports = Schema;
