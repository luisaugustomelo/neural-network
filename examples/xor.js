var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

var myPerceptron = new Architect.Perceptron(2,3,1);
myPerceptron.layers.hidden.forEach(function(hiddenLayer){
    hiddenLayer.set({squash: Neuron.squash.TANH})
	console.log(hiddenLayer);
	console.log("\n");
});
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log(myPerceptron.activate([0,0])); // 0.0268581547421616
console.log(myPerceptron.activate([1,0])); // 0.9829673642853368
console.log(myPerceptron.activate([0,1])); // 0.9831714267395621
console.log(myPerceptron.activate([1,1])); // 0.02128894618097928
