import chalk from 'chalk'

import socketclient from 'socket.io-client';

import readline from 'readline'

console.log(process.argv);



var room:any =null

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let name = process.argv[2]
let address = process.argv[3]

let socket =socketclient(address|| 'http://localhost:8000' )


socket.on('connect', () => {
    console.log(chalk.red('=== Welcome Tic Tac Toe ==='))

    socket.emit('forJoining',  name )

})
socket.on('disconnect', function () {
    socket.emit('disconnect')
});
socket.on('ChooseAnOption', function (data) {
    console.log(data);

    rl.question('Choose Option :', function (option) {
       
        socket.emit('gameOptions',option)

      
    });
})

socket.on('game_created', function (data) {
    console.log(data.message);
     room = data.id
})

socket.on('someonejoined', function () {
    console.log(chalk.yellow('\n'+"Your Opponent joined "+'\n'));
})

socket.on('showAvailableSlot', function (data) {
    console.log(data);
   
    rl.question('Enter the Room id you want to join :', function (option) {

        socket.emit('JoinToGame',option)

    });
})

socket.on('joinid', function (data) {
    
    
    room=data
    console.log(room);
})

socket.on('spectat', function (data) {
    console.log(data);
    rl.question('room id :', function (roomid) {

        socket.emit('spectat',roomid)

      
    });
})

socket.on('message', function (data) { console.log('\n'+data);})

socket.on('warningMessage', function (data) {console.log(chalk.yellow('\n'+data));})

socket.on('dangerMessage', function (data) {console.log(chalk.red('\n'+data));})

socket.on('successMessage', function (data) {console.log(chalk.green('\n'+data));})

socket.on('exit', function (data){
    console.log(chalk.red(data))
    process.exit(0);
})

socket.on('turn', function (data) {
    console.log(data);
    console.log(room);
    


  
    
    
    rl.question('position :', function (option) {
        console.log("position :",option);
        socket.emit('play',{position:option,roomid:room})

      
    });
})


