import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    function generateMore () {
        while (chance.bool({likelihood: 95})) {
            const randonChunk = chance.string({length: (16 * 1024) - 1}); 
            const shouldContinue = res.write(`${randonChunk}\n`);
            if (!shouldContinue) {
                console.log('back-pressure')
                return res.once('drain', generateMore)
            }	
        }
        res.end('\n\n');
    }
    generateMore();
    res.on('finish', () => console.log('All data was sent'))
})

server.listen(8080, () => console.log('Listening on http://localhost:8080'));