
 #! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

class Player {
    name:string;
    health:number = 100;
    constructor(name: string){
        this.name = name;
    }
    decreaseHealth(amount : number = 20){
        this.health -= amount
     }
    increaseHealth(){
        this.health = 100
    }
}
class Opponent{
    name:string;
    health:number = 100;
    constructor(name: string){
        this.name = name
    }
    decreaseHealth(amount : number = 20){
        this.health -= amount
     }
    increaseHealth(){
        this.health = 100
    }
}


//Step 2 Player Object
async function main() {
    console.log(chalk.yellow("********** WELCOME TO WISH ADVENTURE GAME **********"))
    console.log("-".repeat(52));
    
    let{ heroName } = await inquirer.prompt([{
        type:"input",
        name: "heroName",
        message: "Enter Your Player Name"
    }]);

    let {enemyType} = await inquirer.prompt([{
        type: "list",
        name: "enemyType",
        choices: ["Alien" , "Witch" , "Zombie"],
        message: "Select the Enemy Which You want to Fight With:"
    }]);

    // Step 3 Battle Field
    const player = new Player (heroName);
    const  opponent = new Opponent (enemyType);
    console.log(chalk.yellowBright(`${player.name} v/s ${opponent.name}`));
    
    // Step 4 Action
    
        while(true){
        const {action} = await inquirer.prompt([{
            type: "list",
            name: "action",
            choices: ["Attack" , "Defend","Range Target","Run"],
            message: "Choose the Attack Type To Perform Action"
        }]);
    
    // Step 5 switch case
    switch (action) {
        case "Attack":
            console.log(chalk.bgBlue("You Choose Attack!!"));
            
        const randomNum = Math.random();
        if(randomNum > 0.5){
            player.decreaseHealth();
            console.log(chalk.yellowBright(`${player.name} health: ${player.health}`));
            console.log(chalk.yellowBright(`${opponent.name} health: ${opponent.health} `));
           if (player.health <= 0) {
            console.log(chalk.redBright("You LOST!! Try Again"));
            return;
           }
        }
           else{
            opponent.decreaseHealth();
            console.log(chalk.yellowBright(`${player.name} health: ${player.health}`));
            console.log(chalk.yellowBright(`${opponent.name} health: ${opponent.health}`));
           if (player.health <= 0) {
            console.log(chalk.yellowBright.bold("Congratulations!!! You Won!!"))
            return;
           }
        }
        break;
        case "Defend":
            console.log(chalk.bgBlue("You Choose to Defend."));
            const defendRandomnum = Math.random();
            if (defendRandomnum > 0.5){
                console.log(chalk.yellowBright(`${player.name} Successfully defend the attack!`)); 
            }
         else {
            player.decreaseHealth(5); // Reduced damage on failed defense
            console.log(chalk.redBright(`${player.name} failed to defend! Health: ${player.health}`));
            if (player.health <= 0) {
                console.log(chalk.redBright("You LOST!! Try Again"));
                return;
            }
        }
        
        break; 
        case "Range Target":
            console.log(chalk.bgBlue("You Choose range Target attack."));
            const rangeRandomNum = Math.random();
                if (rangeRandomNum > 0.5) {
                    opponent.decreaseHealth(); // Higher damage for range attack
                    console.log(chalk.yellowBright(`Direct hit! ${opponent.name} health: ${opponent.health}`));
                    if (opponent.health <= 0) {
                        console.log(chalk.yellowBright("Congratulations!!! You Won!"));
                        return;
                    }
                } else {
                    console.log(chalk.redBright(`${player.name} missed the range attack!`));
                }
               break;
    case "Run":
        console.log(chalk.redBright("You Choose Run Away.Game Over."));
        return;
        default:
            console.log("Invalid action");
            
    }
}

}

main();
