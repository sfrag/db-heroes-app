var fs = require('fs');
/* var url = fs.readdirSync(cards_resources);
var filename = url.split('/').pop().split('#')[0].split('?')[0];
 */
/* fs.readdirSync(cards_resources).forEach(file => {
    console.log(file);
  })
 */
var array = [];

function appendObjTo(thatArray, objToAppend){
    return Object.freeze(thatArray.concat(objToAppend));
}

fs.readdirSync('cards_resources/GM/PROMO3').forEach((file) => {
    console.log(file);
    file2 = file.slice(0, -4);
    var myobject = {
        collection: "PROMO3",
        counter: 0,
        description: "Dragon Ball Heroes Card",
        id: file2,
        url: "http://www.todoeduspain.com/collections/PROMO3/" + file
    }

    array = appendObjTo(array, myobject);

    console.log(array);

    /* fs.readFile('json_generator.json', 'utf-8', function(err, data){
        if (err) throw err
    
        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.cards.push({
            name: "test",
            age:21
        })
        console.log('testing');
        fs.writeFile('json_generator.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err){
            if (err) throw err
            console.log('Done!');
        })
    }) */
})

fs.writeFile('json_generator.json', JSON.stringify(array), 'utf-8', function(err){
    if (err) throw err
    console.log('Done!');
})

console.log(array);



