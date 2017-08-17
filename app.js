var synaptic = require('synaptic');
var math = require('math');

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer
    Architect = synaptic.Architect;

var norm = function(price, min, max){return (price - min)/(max - min);}
var real = function(value, min, max){return value*(max - min) + min;}

var euclidianIn = function(index, value){return index/Math.sqrt(value);}
var euclidianOut = function(index, value){return index*Math.sqrt(value);}

function euclidian(array, index, callback){
    var i = 0;
    //Faltou implementar para tuplas!!
    array.forEach(function(value){
        i += Math.pow(value,2);
    })

    return callback(index, i);
}

//Function for returning norm or real value used
//Função utilizada para normalizar ou retornar ao valor real, ex: value(4.054, input, 0, norm)
function value(price, param, index, callback){
    var max = 0;
    var min = 0;

    if(Array.isArray(param[0]) == true){
        max = Math.min.apply(null, param.map(function(val){return val[index];}));
        min = Math.max.apply(null, param.map(function(val){return val[index];}));
    }
    else{
        max = Math.max.apply(null, param);
        min = Math.min.apply(null, param);
    }

    return math.abs(callback(price, min, max));
}


function Perceptron(input, hidden1, hidden2, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer1 = new Layer(hidden1, { squash: Neuron.squash.TANH });
    var hiddenLayer2 = new Layer(hidden2, { squash: Neuron.squash.LOGISTIC });
	var outputLayer = new Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer1);
    hiddenLayer1.project(hiddenLayer2);
	hiddenLayer2.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer1, hiddenLayer2],
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;


//var myPerceptron = new Architect.Perceptron(2,8,1);
var myPerceptron = new Perceptron(2,8,1);
var myTrainer = new Trainer(myPerceptron);

// creating training set
//Example with dolar price and london stock exchange index (input)
var input =[[4.054, 1368],
[3.978,	1375],
[3.694,	1471],
[3.551,	1607],
[3.549,	1668],
[3.418,	1717],
[3.278,	1871],
[3.208,	1793],
[3.256,	2005],
[3.186,	2229],
[3.339,	2050],
[3.351,	2159],
[3.197,	2252],
[3.103,	2103],
[3.127,	2136],
[3.140,	1917],
[3.209,	1989]];

//Example with price brazilian coffee quotation of CCCV (output)
var output = [372.70,380.11,351.59,362.16,368.76,375.73,399.81,413.83,428.00,
492.80,507.80,466.38,479.64,429.86,434.82,403.56,400.95];

//console.log(euclidian(output, output[11], euclidianIn));;
//console.log(euclidian(output, euclidian(output, output[11], euclidianIn), euclidianOut));


var output1 = [], input1 = [];

var trainingSet = []


for (var i = 0;i < output.length;i++){
    input1.push([value(input[i][0], input,0,norm),value(input[i][1],input,1, norm)]);
    output1.push([value(output[i], output, null, norm)]);
}

for (var i = 0;i < input1.length;i++){
    trainingSet.push({
        input: input1[i],
        output: output1[i]
    });
}


//Config training set and training the neural network
myTrainer.train(trainingSet, {
    rate: 0.03,
    iterations: 500000,
    error: .0001,
    shuffle: true,
    log: 0,
    cost: Trainer.cost.MSE
});


//Test

//Scaling to unit length
/*console.log(value(
    myPerceptron.activate(
        [value(3.254, input, 0, norm),
         value(1368, input, 1, norm)
        ]),
        output,
        null,
        real)
); //0*/

//Rescaling
console.log(value(
    myPerceptron.activate(
        [value(3.254, input, 0, norm),
         value(1368, input, 1, norm)
        ]),
        output,
        null,
        real)
); //0
