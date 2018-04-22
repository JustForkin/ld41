//@HOCKEYPLAYER
class HockeyPlayer extends Movable {
	constructor(ordinal, color, side) {
		super();

		this.id = ++ID;
		let x = 205 + (ordinal*200);

		this.ordinal = ordinal;

		let y;
		if (side == TEAM_SIDE.top) {
			y = 350;
			if (ordinal != 1) y += 50;
		} else {
			y = 1050;
			if (ordinal != 1) y -= 50;
		}

		this.sprite = game.phaser.add.sprite(x, y, color == TEAM_COLORS.red ? "red-player" : "blue-player");
		this.sprite.anchor.set(0.5);
		this.sprite.pivot.set(0.5);
		this.sprite.bringToTop();
		game.phaser.physics.p2.enable([this.sprite], Phaser.Physics.ARCADE);
		this.sprite.body.setCircle(18);
		this.sprite.body.restitution = 0.8;
		this.sprite.body.damping = 0.75;
		this.sprite.body.debug = DEBUG;

		this.shootRing = game.phaser.add.sprite(x, y, color == TEAM_COLORS.red ? "redshootring" : "blueshootring");
		this.shootRing.anchor.set(0.5);
		this.shootRing.pivot.set(0.5);
		this.shootRing.scale.set(0);

		this.reset();
		this.collidingWithPuck = false;
	}

	destroy() {
		this.sprite.destroy();
		this.shootRing.destroy();
	}

	reset() {
		this.pendingMovement = null;
		this.collidingWith = [];
		this.fightProcessed = false;
		this.movementCancelled = false;
		this.inFight = false;
		this.inPuckFight = false;
	}

	render() {
		this.shootRing.angle += 1;
		this.shootRing.position.x = this.sprite.position.x;
		this.shootRing.position.y = this.sprite.position.y;
		this.sprite.bringToTop();

		if (DEBUG) game.phaser.debug.body(this.sprite);
	}

}

