const MonkeyLearn = require('monkeylearn')
// API Key
const ml = new MonkeyLearn('d1eef86950e7e2b512e1a1d6630633b06020e518')


module.exports = {
    languageClassifier(data) {
        let model_id = 'cl_Vay9jh28'
        ml.classifiers.classify(model_id, data).then(res => {
            console.log(res.body[0].classifications[0].tag_name)
        })
    },
    urgencyDetection(data) {
        let model_id = 'cl_Aiu8dfYF'
        ml.classifiers.classify(model_id, data).then(res => {
            console.log(res.body[0].classifications[0].tag_name)
        })
    }
}