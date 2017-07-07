var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron.squash.TANH,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var myPerceptron = new Architect.Perceptron(3,15,5,1);
var myTrainer = new Trainer(myPerceptron);

var xor2_input = [[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,1,0]];
var xor2_output = [[0],[1],[1],[0],[1],[0]];

var trainingSet = [];

for (var i = 0; i < xor2_input.length; i++){
    trainingSet.push({
        input: xor2_input[i],
        output: xor2_output[i]
    });
}

myTrainer.train(trainingSet, {
    rate: 0.05,
    iterations: 500000,
    error: .0001,
    shuffle: true,
    log: 0,
    cost: Trainer.cost.MSE
});


console.log(myPerceptron.activate([0,0,0])); //0
console.log(myPerceptron.activate([0,1,0])); //1
console.log(myPerceptron.activate([1,0,1])); //0
console.log(myPerceptron.activate([1,1,0])); //0
console.log(myPerceptron.activate([1,1,1])); //1
