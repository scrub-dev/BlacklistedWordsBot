require('@tensorflow/tfjs');
const tf = require('@tensorflow/tfjs-node');
const smartDetect = require('@tensorflow-models/toxicity');
const { userError } = require('./utils');

module.exports.test = async (text) => {
    const threshold = 0.8;
    smartDetect.load(threshold).then(model => {
        const sentences = [text];
        model.classify(sentences).then(predictions => {
            predictions.forEach(element => {
            console.log(`Type: ${element.label} | Results : ${element.results[0].match}`)
            })
        });
    });
}
module.exports.checkContent = async (message, threshold) => {
    return new Promise(resolve => {
        threshold = threshold / 10
        if(threshold > 0.9 || threshold < 0.1) return userError(message, "Invalid Threshold 0.1 >= N >= 0.9")
        smartDetect.load(threshold).then(model => {
            const text = [message.content]
            let predObj = {}
            model.classify(text).then(preds => {
                preds.forEach(e => {
                    predObj[e.label] = e.results[0].match || false
                })
                resolve(predObj)
            })
        })
    })
}