#!/usr/bin/env gjs

var Effect=
class Effect{
    constructor(id, position, text, soundFile, imageFile){
        this._id = id;
        this._position = position;
        this._text = text;
        this._soundFile = soundFile;
        this._imageFile = imageFile;
    }
    setId(id){
        this._id = id;
    }
    getId(){
        return this._id;
    }
    setPosition(position){
        this._position = position;
    }
    getPosition(){
        return this._position;
    }
    setText(text){
        this._text = text;
    }
    getText(){
        return this._text;
    }
    setSoundFile(soundFile){
        this._soundFile = soundFile;
    }
    getSoundFile(){
        return this._soundFile;
    }
    setImageFile(imageFile){
        this._imageFile = imageFile;
    }
    getImageFile(){
        return this._imageFile;
    }
    toString(){
        return `id: ${this._id},
                position: ${this._position},
                text: ${this._text},
                soundFile: ${this._soundFile},
                imageFile: ${this._imageFile}`;
    }
    equals(other){
        return ((other instanceof Effect) &&
                 other.getId() == this.getId());
    }
}
