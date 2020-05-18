export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalId = null
        this.isPlaing = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaing = true
        this.startTimer()
        this.updateView()
    }

    pause() {
        this.isPlaing = false;
        this.stopTimer()
        this.updateView()
    }

    reset() {
        this.game.reset()
        this.play();
    }

    updateView() {
        const state = this.game.getState();
        if (state.isGameOver) {
            this.view.renderGameOverScreen(state);
        } else if (!this.isPlaing) {
            this.view.renderPauseScreen()
        } else {
            view.renderMainScreen(state)
        }

    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;
        if (!this.intervalId)
            this.intervalId = setInterval(() => this.update(), speed > 0 ? speed : 100);

    };

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null
        }
    }

    handleKeyDown(e) {
        const state = this.game.getState();
        switch (e.keyCode) {
            case 37: // left arrow
                this.game.movePieceLeft()
                this.updateView()
                break;
            case 38: // upp arrow
                this.game.rotatePiece();
                this.updateView()
                break;
            case 39: // right arrow
                this.game.movePieceRight()
                this.updateView()
                break;
            case 40: // down arrow
                this.stopTimer()
                this.game.movePieceDown();
                this.updateView()
                break;
            case 13: // enter
                if (state.isGameOver) this.reset();
                else if (this.isPlaing) this.pause();
                else this.play()

                break;
        }
    };

    handleKeyUp(e) {
        switch (e.keyCode) {
            case 40: // down arrow
                this.startTimer()
                break;

        }
    };

}