/// <reference path="../../typings/howler.d.ts"/>
class SoundsManager{
    // public static SINGLETON: SoundsManager = null;
    
    public mute: boolean = false;
    
    public soundsLoaded: boolean = false;
    private _jsonFileLoaded: boolean = false;
    private _soundFileString: string = "";
    
    public soundMarkers: {[id: string]: soundMarker;} = {};
    private _soundFile : soundFile;
    
    constructor(sound_file: string){
        
        //this._soundFile = new soundFile();
        // if(SoundsManager.SINGLETON == null){
        //     SoundsManager.SINGLETON = this;
        // }
        // else {
        //     delete this;
        //     return;
        // }
        
        this._soundFileString = sound_file;
        
        this._loadMarkers(sound_file + '.json');
        
    }
    
    public mp3Enabled(): boolean {
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio\ogg;').replace(/no/, ""));
    }
    
    public play(sound_name: string):void {
        
        if(this.mute){
            return;
        }
        // console.log(sound_name);
        var marker: soundMarker = this.soundMarkers[sound_name];
        // console.log(marker);
        
        let sf = new soundFile("sound/" + marker.name + ".ogg");
        
        if(marker != null && marker != undefined){
            // console.log("yeye");
            sf.play(marker.start, marker.duration);
            var sound = new Howl({
                urls: ["sound/" +marker.name + ".ogg"],
                sprite: {
                    blast: [0, 2000],
                }
            });
            
            sound.play('blast');
        }
    }
    
    private _loadMarkers(jsonfile: string):void {
        // console.log("LOAD MARKERS");
        var marker_xhr = new XMLHttpRequest();
        // console.log("ga dit laden: " + jsonfile);
        marker_xhr.onreadystatechange = () => {
            if(marker_xhr.readyState === XMLHttpRequest.DONE && marker_xhr.status === 200){
                console.log("laden gelukt! ");
                let obj = JSON.parse(marker_xhr.responseText);
                this.parseJsonSounds(obj);
            }
            else {
                //state 1 en 2 betekent dat het laden nog bezig is
                //this._onError(marker_xhr);
            }
        };

        marker_xhr.open("GET", jsonfile, true);
        marker_xhr.send();
    }
    
    protected parseJsonSounds(data: any) {
        // console.log("onread aangeroepen");
        
        for (let i = 0;i<data.markers.length;i++){
            var obj = data.markers[i];
            // console.log("marker name is " + obj.name);
                        
            var markers:any = obj;
            this.addMarker(new soundMarker(obj.name, obj.start, obj.duration, obj.volume, obj.loop));
            
            // sound maken voor elke json entry
            // console.log("sound/" + obj.name + ".ogg");
            
            
            
            // howler JS //
            // var sound = new Howl();
             
             
        }
        
        this._jsonFileLoaded = true;
        
        // if(this._soundFile.loadComplete == true){
            this.soundsLoaded = true;
        // }
        
        
    }
    
    public soundFileLoaded():void {
        if(this._jsonFileLoaded == true){
            this.soundsLoaded = true;
        }
    }
    
    protected _onError(xhr: XMLHttpRequest) : void {
        console.log("COULD NOT LOAD SOUND MARKER FILE: " + this._soundFileString + ".json status=" + xhr.readyState);
    }
    
    public addMarker(sound_marker: soundMarker):void {
        this.soundMarkers[sound_marker.name] = sound_marker;
    }
    
    public removeMarker(marker_name: string):void {
        delete this.soundMarkers[marker_name];
    }
    
}