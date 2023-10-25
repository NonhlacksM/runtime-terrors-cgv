class AudioManager {
    constructor(audioFile) {
        this.audio = null;
        this.audioFile = audioFile;
    }
    //Play music
    playSound() {
        if (!this.audio) {
            this.audio = new Audio(this.audioFile);
            //this.audio.loop = true;
        }

        if (this.audio.paused) {
            this.audio.play();
        }
    }
    //Stop music
    stopSound() {
        if (this.audio) {
            this.audio.pause();
        }
    }
}
//exporting this class
export default AudioManager;
