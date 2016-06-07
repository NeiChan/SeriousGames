class soundFile{
    public context: AudioContext;
    public loadComplete: boolean = false;
    public xhr: XMLHttpRequest;
    
    public buffer: AudioBuffer;
    public source: AudioBufferSourceNode;
    
    constructor(soundURL:string){
        try{
            this.context = new AudioContext();
            this.loadFile(soundURL);
        }
        catch(e){
            console.log("no audio detected");
        }
    }
    
    private loadFile(file_name: string) {
        if(this.context == undefined){
            return;
        }
        
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET',file_name, true);
        this.xhr.responseType = 'arraybuffer';
        this.xhr.onload = this.onloadComplete;
        this.xhr.send();
    }
    
    public onloadComplete = (ev: Event): any => {
        this.xhr = <XMLHttpRequest>ev.currentTarget;
        this.context.decodeAudioData(this.xhr.response, this.decodeData);
    }
    
    public decodeData = (buffer: AudioBuffer): void => {
        this.buffer = buffer;
        this.loadComplete = true;
    }
    
    public play = (start_time: number, duration: number) => {
        if(this.context == undefined){
            return;
        }
        
        if(this.loadComplete == false){
            return;
        }
        
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.context.destination);
        this.source.start(this.context.currentTime, start_time, duration);
    }
}

class soundMarker{
    public name: string = "";
    public start: number = 0;
    public duration: number = 0;
    public volume: number = 1;
    public loop: boolean = false;
    
    constructor(name: string, start: number, duration: number, volume: number, loop: boolean){
        this.name = name;
        this.start = start;
        this.duration = duration;
        this.volume = volume;
        this.loop = loop;
    }
}