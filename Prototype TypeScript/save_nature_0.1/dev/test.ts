class test{
    
    public static addSoundEvent(el: HTMLElement, soundName: string): HTMLElement{
        el.addEventListener('click', () => Game.soundmanager.play(soundName));
        return el;
    }
}