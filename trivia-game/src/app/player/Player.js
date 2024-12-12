class Player {
    constructor(name, avatar) {
        this.id = generateUniqueId();
        this.name = name;
        this.score = 0;
        this.streak = 0;
        this.avatar = avatar;
    }

    addScore(points) {
        this.score += points;
    }

    resetStreak() {
        this.streak = 0;
    }
}