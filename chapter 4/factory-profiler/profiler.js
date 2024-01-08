class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  start() {
    this.lastTime = process.hrtime();
  }

  end() {
    const diff = process.hrtime(this.lastTime);
    console.log(
      `Timer "${this.label}" took ${diff[0]} seconds and ${diff[1]} nanoseconds`
    );
  }
}

const noopProfiler = {
  start() {},
  end() {},
};

 export function createProfiler (label)  {
    if (process.env.NODE_ENV === 'production') {
        return noopProfiler
    } else if(process.env.NODE_ENV === 'development') {
        return new Profiler(label)
    } else {
        throw new Error('Must set NODE_ENV')
    }
}

// SET ENVIROMENT VARIABLE ONCE IN POWERSHELL WINDOWS
// $env:NODE_ENV = "development"
// node profilerTest.js <your_number_here>

