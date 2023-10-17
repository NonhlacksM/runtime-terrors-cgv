class AudioManager {
    constructor(audioFile) {
        this.audio = null;
        this.audioFile = audioFile;
    }

    playSound() {
        if (!this.audio) {
            this.audio = new Audio(this.audioFile);
            //this.audio.loop = true;
        }

        if (this.audio.paused) {
            this.audio.play();
        }
    }

    stopSound() {
        if (this.audio) {
            this.audio.pause();
        }
    }
}

export default AudioManager;
