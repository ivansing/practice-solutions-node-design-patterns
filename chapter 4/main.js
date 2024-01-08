
// Factory pattern
const createImage = name => {
    if(name.match(/\.jpg$/)) {
        return new JpegImage(name)
    } else if(name.match(/\.gif$/)) {
        return new GifImage(name)
    } else if(name.match(/\.png$/)) {
        return new PngImage(name)
    } else if(name.match(/\.png$/)) {
        return new PngImage(name)
    } else {
        throw new Exception('Unsupported format')
    }
}

// function createImage(name) {
//     return new Image(name);
//     }
//     var image = createImage('photo.jpeg');
    
//     var image = new Image(name);// javascript way

// private members javascript
const createPerson = name => {
    const privateProperties = {}

    let person = {
        setName: name => {
            if(!name) throw new Error('A person must have a name')
            privateProperties.name = name
        },
        getName: () => {
            return privateProperties.name 
        }
    }

    person.setName(name)
    return person
}    

const person = createPerson('Ivan D.');
console.log(`Name: ${person.getName()}`) // Name: Ivan D.

