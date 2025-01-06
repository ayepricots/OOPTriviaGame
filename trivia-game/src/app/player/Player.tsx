class Player {
    id: string;
    name: string;
    score: number;
    streak: number;
    avatar: string;

    constructor(name: string, avatar: string) {
        this.id = Player.generateUniqueId();
        this.name = name;
        this.score = 0;
        this.streak = 0;
        this.avatar = avatar;
    }

    // Increment the score by a specified number of points
    addScore(points: number): void {
        if (points < 0) {
            throw new Error("Points must be a positive number.");
        }
        this.score += points;
    }

    // Reset the score to 0
    resetScore(): void {
        this.score = 0;
    }

    // Increment the streak by 1
    addStreak(): void {
        this.streak++;
    }

    // Reset the streak to 0
    resetStreak(): void {
        this.streak = 0;
    }

    // Static method to generate unique IDs
    private static generateUniqueId(): string {
        return Math.random().toString(36).substr(2, 9); // Generates a pseudo-random unique string
    }
}