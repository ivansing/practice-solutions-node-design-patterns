class CreateProxy {
    constructor (subject) {
        this.subject = subject
    }


    // proxying a method
    hello () {
        return this.subject.hello() +  ' world!'
    }

    // delegating a method
    goodbye () {
        return this.subject.goodbye.apply(this.subject, arguments)
    }

    // proxying a getter
    get name () {
        return this.subject.name
    }   

    // delegating a setter
    set name (value) {
        this.subject.name = value
    }

    // proxying a property
    get title () {
        return this.subject.title
    }

    // delegating a property
    set title (value) {
        this.subject.title = value
    }

    // proxying a method that returns an instance
    // of the proxy itself
    static create (subject) {
        return new CreateProxy(subject)
    }
}

const createProxy = CreateProxy.create({
    hello () {
        return 'hello'
    },

    goodbye () {
        return 'goodbye'
    }
})

// console.log(createProxy.hello() === 'hello world!') //true

// console.log(createProxy.goodbye() === 'goodbye') //true

console.log(createProxy.name())